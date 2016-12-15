

// Imports
var express = require('express');
var app = express();
var db = require('./database.js'); //Database.js import
var bodyParser = require('body-parser');
var validate = require('express-jsonschema').validate;

var port = 3000;
var message_sch = require('./schemas/message.json');

var mongo_express = require('mongo-express/lib/middleware');
// Import the default Mongo Express configuration
var mongo_express_config = require('./mongo_express_config.js');

var MongoDB = require('mongodb');
var MongoClient = MongoDB.MongoClient;
var ObjectID = MongoDB.ObjectID;
var url = 'mongodb://localhost:27017/GeoPost';
var ResetDatabase = require('./resetdatabase');

// I renamed the db in the connect function to mongodb, so we could use db during the migration 
MongoClient.connect(url, function(err, mongodb) 
{
    //Express
    app.use(bodyParser.text());
    app.use(bodyParser.json());
    app.use(express.static("../client/build"));
    app.use('/mongo_express', mongo_express(mongo_express_config));
    
    /**
     * Helper function: Sends back HTTP response with error code 500 due to
     * a database error.
     */
    function sendDatabaseError(res, err) {
        res.status(500).send("A database error occurred: " + err);
    }

    /**
     * Get the user ID from a token. Returns -1 (an invalid ID) if it fails.
     */
    function getUserIdFromToken(authorizationLine) 
    {
        try {
        // Cut off "Bearer " from the header value.
        var token = authorizationLine.slice(7);
        // Convert the base64 string to a UTF-8 string.
        var regularString = new Buffer(token, 'base64').toString('utf8');
        // Convert the UTF-8 string into a JavaScript object.
        var tokenObj = JSON.parse(regularString);
        var id = tokenObj['id'];
        // Check that id is a number.
        // Check that id is a string.
        if (typeof id === 'string') {
            return id;
        } else {
            // Not a number. Return "", an invalid ID.
            return "";
        }
        } catch (e) {
        // Return an invalid ID.
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

    app.get("/:userid/posts", function(req, res) {
    if(checkAuth(req, res)) {
        var id = parseInt(req.params.userid, 10);
        var user = db.readDocument('users', id);
            if(user.post === -1) {
                var newDoc = db.addDocument('posts', {
                "poster": id,
                "posts": []
            });
            user.post = newDoc._id;
        }
        res.send(formatChat(db.readDocument('post', user.post)));
    }  else {
        res.status(401).end();
    }
    });

    app.get("/search/:query", function(req, res) 
    {
        mongodb.collection('posts').find( 
        {
                postText: { $regex: req.params.query+"*" , $options: 'i' }
        }).toArray(function(err, posts, score) 
        {
            mongodb.collection('users').find( 
            {
                    _id: { $in: posts.map(function(post){ return post.user}) }
            }).toArray(function(err, people) 
            {
                posts.map(function(post){
                    post.person = people.filter(function(p) { return p._id != post.user})[0]
                    return post;
                });
                res.send(posts);
            });

        });
    });

    app.get("/user/:userID", function(req, res) {
        var userData = db.readDocument('users', req.params.userID);
        res.send(userData);
    });

    app.get("/getcomments/:postID", function(req, res) {
    var postData = db.readDocument('posts', 0);
    for (var i = 1; i <= postData.count; i++)
    {
        var result = db.readDocument('posts', i);
        if (result.postID == req.params.postID)
        {
        var resultsList = [];
        var comments = db.readDocument('comments', 0);
        for(var count = 1; count <= comments.count; count++)
        {
            var result2 = db.readDocument('comments', count);
            if (result.commentsIDList.indexOf(count) >= 0)
            {
            var userData = db.readDocument('users', result.user);
            result2.person = userData;
            resultsList.push(result2);
            }
        }
        res.send(resultsList);
        return;
        }
    }
    res.send(null);
    });


    // count describes the top X posts to retreive
    // post calculation is done by upvote/downvote ratio
    app.get("/hot/:count", function(req, res) {
        var postData = db.readDocument('posts', 0);
        var resultsList = [];
        for (var i = 1; i <= postData.count; i++)
        {
            var result = db.readDocument('posts', i);
            var userData = db.readDocument('users', result.user);
            result.person = userData;
            resultsList.push(result);
        }

        resultsList = resultsList.sort(function(a, b) {
            if (((parseInt(a.upvotes, 10) + 1) / ((parseInt(a.downvotes, 10) + 1))) -
            ((parseInt(b.upvotes, 10) + 1) / ((parseInt(b.downvotes, 10) + 1))) > 0) return -1;
            if (((parseInt(a.upvotes, 10) + 1) / ((parseInt(a.downvotes, 10) + 1))) -
            ((parseInt(b.upvotes, 10) + 1) / ((parseInt(b.downvotes, 10) + 1))) < 0) return 1;
            return 0;
        });
        res.send(resultsList.slice(0, req.params.count));
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
    });

});


