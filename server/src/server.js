// Imports
var express = require('express');
var app = express();
var db = require('./database.js'); //Database.js import
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;

var port = 3000;
var message_sch = require('./schemas/message.json');

//Express
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static("../client/build"));

/**
 * Get the user ID from a token. Returns -1 (an invalid ID)
 * if it fails.
 */
function getUserIdFromToken(authorizationLine) {
    try {
        var token = authorizationLine.slice(7);
        var regularString = new Buffer(token, 'base64').toString('utf8');
        var tokenObj = JSON.parse(regularString);
        var id = tokenObj['id'];
        if (typeof id === 'number') {
            return id;
        } else {
            return -1;
        }
    } catch (e) {
        return -1;
    }
}

/*
 * Shorten this as it will be called anytime we send the userId.
 */
function checkAuth(req, res) {
    var fromUser = getUserIdFromToken(req.get('Authorization'));
    var useridNumber = parseInt(req.params.userid, 10);
    return fromUser == useridNumber;
}

app.get("/user/:userid", function(req, res) {
    if (checkAuth(req, res)) {
        res.send(db.readDocument('users', parseInt(req.params.userid, 10)));
    } else {
        res.status(401).end();
    }
});

function postMessage(fromId, chatid, message) {
    var userInfo = db.readDocument('users', fromId);
    var chat = db.readDocument('messages', userInfo.chat);

    var message = {
        "from": fromId,
        "message": message,
        "timestamp": new Date().getTime()
    }

    var chatWith = db.readDocument('users', chat.chats[chatid].chatID);
    if(chatWith.chat === -1) {//no chat exists!
        var newDoc = db.addDocument('messages', {
            "chatOwner": chatWith._id,
            "chats": []
        });
        chatWith.chat = newDoc._id;
    }
    var otherChat = db.readDocument('messages', chatWith.chat);//should check if document exists!
    var index = otherChat.chats.length;
    for(var i = 0; i < otherChat.chats.length; i++) {
        if(fromId == otherChat.chats[i].chatID) {
            otherChat.chats[i].read = false;
            index = i;
            break;
        }
    }
    if(index === otherChat.chats.length) {
        otherChat.chats.push({
            "chatID": fromId,//id of user in the chat
            "read": false,
            "messages": []
        });
    }
    otherChat.chats[index].messages.push(message);
    chat.chats[chatid].messages.push(message);
    db.writeDocument('messages', chat);
    db.writeDocument('messages', otherChat);
    return formatChat(chat); // we could return userInfo or the chat of the user.
}

/**
 * Change status of a conversation to 'read'.
 */
app.put("/:userid/message/:chat/read", function(req, res) {
    if(checkAuth(req, res)) {
        var userId = parseInt(req.params.userid, 10);
        var user = db.readDocument('messages', userId);
        user.chats[parseInt(req.params.chat, 10)].read = true;
        db.writeDocument('messages', user);
        res.send(user);//we will send the whole thing incase there was a conversation update!
    } else {
        res.status(401).end();
    }
});

function formatChat(chat) {
    chat.chatOwner = db.readDocument('users', chat.chatOwner);
    for(var i = 0; i < chat.chats.length; i++) {
        chat.chats[i].chatID = db.readDocument('users', chat.chats[i].chatID);
        for(var j = 0; j < chat.chats[i].messages.length; j++) {
            chat.chats[i].messages[j].from = db.readDocument('users', chat.chats[i].messages[j].from);
        }
    }
    return chat;
}

app.get("/:userid/messages", function(req, res) {
   if(checkAuth(req, res)) {
       var id = parseInt(req.params.userid, 10);
       var user = db.readDocument('users', id);
       if(user.chat === -1) {//no chat exists!
           var newDoc = db.addDocument('messages', {
               "chatOwner": id,
               "chats": []
           });
           user.chat = newDoc._id;
       }
       res.send(formatChat(db.readDocument('messages', user.chat)));
   }  else {
       res.status(401).end();
   }
});

/**
 * Send a message.
 *
 */
app.put("/:userid/message",
    validate({ body: message_sch}), function(req, res) {
    if(checkAuth(req, res)) {
        var newConv = postMessage(req.body.from, req.body.chat, req.body.message);
        res.send(newConv);
    } else {
        res.status(401).end();
    }
});

// Starts the server on port 3000!
app.listen(port, function () {
    console.log('Geopost listening on port: ' + port);
});
app.use(function(err, req, res, next) {
    if (err.name === 'JsonSchemaValidation') {
        res.status(400).end();
    } else {
        next(err);
    }
})