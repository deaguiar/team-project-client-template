

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
    app.use(bodyParser.urlencoded({ extended: true }));
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
    function checkAuth(req) {
        var fromUser = getUserIdFromToken(req.get('Authorization'));
        var useridNumber = parseInt(req.params.userid, 10);
        return fromUser == useridNumber;
    }

    app.get("/user/:userid", function(req, res) {
        //if (checkAuth(req)) {
            var id = new ObjectID(req.params.userid);
            getUser(id, function(err, usr) {
               if(err) {
                   res.status(500).send("Database error: " + err);
               }  else {
                   res.send(usr);
               }
            });
       // } else {
        //    res.status(401).end();
        //}
    });

    function postMessage(fromId, chatid, message, cb) {
        var message = {
            "from": fromId,
            "message": message,
            "timestamp": new Date().getTime()
        }
        getUser(fromId, function(err, userInfo) {
            //var chat = db.readDocument('messages', userInfo.chat);
            obtainMessages(userInfo, function(err, chat) {
                //var chatWith = db.readDocument('users', chat.chats[chatid].chatID);
                getUser(chat.chats[chatid].chatID, function(err, chatWith) { //this is where we update the other users chat!
                    //TODO: Adjust this to add message to recipiants messages also!
                    /*if(chatWith.chat === -1) {//no chat exists!
                        var newDoc = db.addDocument('messages', {
                            "chatOwner": chatWith._id,
                            "chats": [message]
                        });
                        chatWith.chat = newDoc._id;
                    }*/
                    //var otherChat = db.readDocument('messages', chatWith.chat);//should check if document exists!
                    obtainMessages(chatWith, function(err, otherChat) {
                        /*var index = otherChat.chats.length;
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
                        }*/
                        mongodb.collection('messages').updateOne({_id: chat._id, "chats.chatID": chatWith._id},
                            {
                              //$set: {read: false}, set read to false for other user
                              $push: { "chats.$.messages": message}
                            },
                            function(err) {
                                //otherChat.chats[index].messages.push(message);
                                chat.chats[chatid].messages.push(message);
                                //db.writeDocument('messages', otherChat); //write to them first incase something goes wrong we abort!
                                cb(null, chat);
                        });
                    });
                });
            });
        });
    }

    /**
     * Change status of a conversation to 'read'.
     */
    app.put("/:userid/message/:chat/read", function(req, res) {
       // if(checkAuth(req)) {
            var userId = req.params.userid;
        getUser(new ObjectID(userId), function (err, data) {
            if (err) {
                console.log('ERROR DATABSE!');
            } else if (data === null) {
                console.log('ERROR USER NOT FOUND!');
            } else {
                obtainMessages(data, function (err, chat) {
                    if (err) {
                        console.log("DATABSE ERROR");
                    } else if (chat == null) {
                        console.log("MESSAGE DATA NULL");
                    } else {
                        resolveUserObjects(function (err, map) {
                            if (err) {
                                console.log("DATABSE ERROR");
                            } else if (map == null) {
                                console.log("MAP DATA NULL");
                            } else {
                                var idx = parseInt(req.params.chat, 10);
                                var chats = {
                                    "$set": {}
                                };
                                chats["$set"]["chats." + idx + ".read"] = true
                                mongodb.collection('messages').updateOne({_id: chat._id},
                                    chats
                                    , function (err) {
                                        if (err) {
                                            console.log("ERROR TRYING TO UPDATE: " + err);
                                        }
                                        chat.chats[idx].read = true;
                                        chat.chatOwner = map[chat.chatOwner];
                                        for (var i = 0; i < chat.chats.length; i++) {
                                            chat.chats[i].chatID = map[chat.chats[i].chatID];
                                            for (var j = 0; j < chat.chats[i].messages.length; j++) {
                                                chat.chats[i].messages[j].from = map[chat.chats[i].messages[j].from];
                                            }
                                        }
                                        res.send(chat);
                                    });
                            }
                        });
                    }
                });
            }
        });
        //} else {
         //   res.status(401).end();
        //}
    });

    /**
     * Resolves a list of user objects. Returns an object that maps user IDs to
     * user objects.
     */
    function resolveUserObjects(callback)
    {
            mongodb.collection('users').find().toArray(function(err,users){
                if(err){
                    return callback(err);
                }
                // Build a map from ID to user object.
                // (so userMap["4"] will give the user with ID 4)
                var userMap = {};
                users.forEach((user) => {
                    userMap[user._id] = user;
                });
                callback(null,userMap);
            });
    }

    function obtainMessages(user, callback) {
        if(user.chat === -1) {//no chat exists!
            var newDoc = {
                "chatOwner": user._id,
                "chats": []
            };
            mongodb.collection('messages').insertOne(newDoc, function(er, mes) {
                newDoc._id = mes._insertedId
                mongodb.collection('users').updateOne({ _id: user._id},
                    {
                        $set: {"chat": newDoc._id}
                    }, function(err) {
                        newDoc.chatOwner = user;
                        callback(null, newDoc);
                    });
            });
        } else {
            mongodb.collection('messages').findOne({_id: user.chat}, function(err, mes) {
                callback(null, mes);
            });
        }
    }

    /**
     * Gets the user information from the database.
     * @param userId Id of the user. ObjectID format.
     * @param callback The function to pass data to.
     */
    function getUser(user, callback) {
        mongodb.collection('users').findOne({ _id: user}, function(err, userData) {
            if(err)
                return callback(err);
            else if(userData == null)
                return callback(null, null);
            callback(null, userData);
        });
    }

    app.get("/:userid/messages", function(req, res) {
        //if(checkAuth(req, res)) {
        var id = req.params.userid;
        getUser(new ObjectID(id), function (err, data) {
            if (err) {
                console.log('ERROR DATABSE!');
            } else if (data === null) {
                console.log('ERROR USER NOT FOUND!');
            } else {
                obtainMessages(data, function (err, chat) {
                    if (err) {
                        console.log("DATABSE ERROR");
                    } else if (chat == null) {
                        console.log("MESSAGE DATA NULL");
                    } else {
                        resolveUserObjects(function (err, map) {
                            if (err) {
                                console.log("DATABSE ERROR");
                            } else if (map == null) {
                                console.log("MAP DATA NULL");
                            } else {
                                chat.chatOwner = map[chat.chatOwner];

                                for (var i = 0; i < chat.chats.length; i++) {
                                    chat.chats[i].chatID = map[chat.chats[i].chatID];
                                    for (var j = 0; j < chat.chats[i].messages.length; j++) {
                                        chat.chats[i].messages[j].from = map[chat.chats[i].messages[j].from];
                                    }
                                }
                                res.send(chat);
                            }
                        });
                    }
                });
            }
            // }  else {
            //    res.status(401).end();
            //}
        });
    });

    /**
     * Send a message.
     *
     */
    app.put("/:userid/message",
        validate({ body: message_sch}), function(req, res) {
        //if(checkAuth(req)) {
            postMessage(new ObjectID(req.body.from), parseInt(req.body.chat, 10), req.body.message, function(err, chat) {
                resolveUserObjects(function (err, map) {
                    if (err) {
                        console.log("DATABSE ERROR");
                    } else if (map == null) {
                        console.log("MAP DATA NULL");
                    } else {
                        chat.chatOwner = map[chat.chatOwner];

                        for (var i = 0; i < chat.chats.length; i++) {
                            chat.chats[i].chatID = map[chat.chats[i].chatID];
                            for (var j = 0; j < chat.chats[i].messages.length; j++) {
                                chat.chats[i].messages[j].from = map[chat.chats[i].messages[j].from];
                            }
                        }
                        res.send(chat);
                    }
                });
            });
       // } else {
        //    res.status(401).end();
        //}
    });

    app.get("/:userid/posts", function(req, res) {
    if(checkAuth(req)) {
        var id = parseInt(req.params.userid, 10);
        var user = db.readDocument('users', id);
            if(user.post === -1) {
                var newDoc = db.addDocument('posts', {
                "poster": id,
                "posts": []
            });
            user.post = newDoc._id;
        }
        res.send(db.readDocument('post', user.post));
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
                    post.person = people.filter(function(p)
                    {
                        return p._id.toString() === post.user.toString();
                    })[0]
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

    app.get("/getcomments/:postID", function(req, res)
    {
        mongodb.collection('posts').find(
        {
                postID: new ObjectID(req.params.postID)
        }).toArray(function(err, posts)
        {
            mongodb.collection('comments').find(
            {
                    _id: {$in: posts[0].commentsIDList.map(function(comment){ return new ObjectID(comment) }) }
            }).toArray(function(err, comments)
            {
                mongodb.collection('users').find().toArray(function(err, people)
                {
                    comments.map(function(comment){
                        comment.person = people.filter(function(p) { return p._id.toString() === comment.user.toString()})[0]
                        return comment;
                    });
                    res.send(comments);
                });
            });
        });
    });


    // count describes the top X posts to retreive
    // post calculation is done by upvote/downvote ratio
    app.get("/hot/:count", function(req, res) {
        mongodb.collection('posts').find().toArray(function(err, posts, score)
        {
            mongodb.collection('users').find(
            {
                    _id: { $in: posts.map(function(post){ return post.user}) }
            }).toArray(function(err, people)
            {
                posts.map(function(post){
                    post.person = people.filter(function(p) { return p._id.toString() === post.user.toString()})[0]
                    return post;
                });
                posts = posts.sort(function(a, b)
                {
                    if (((parseInt(a.upvotes, 10) + 1) / ((parseInt(a.downvotes, 10) + 1))) -
                    ((parseInt(b.upvotes, 10) + 1) / ((parseInt(b.downvotes, 10) + 1))) > 0) return -1;
                    if (((parseInt(a.upvotes, 10) + 1) / ((parseInt(a.downvotes, 10) + 1))) -
                    ((parseInt(b.upvotes, 10) + 1) / ((parseInt(b.downvotes, 10) + 1))) < 0) return 1;
                    return 0;
                });
                res.send(posts.slice(0, req.params.count));
            });
        });
    });

    // Reset the database.
    app.post('/post/comment', function(req, res) {
        var newID = new ObjectID(); // generate a new random ID for the comment
        // only allow comments with text to be posted
        if (req.body.comment !== "")
        {//_id: new ObjectID(newID) ,
            mongodb.collection('comments').insert({_id: new ObjectID(newID) ,user: new ObjectID(req.body.author), commentText: req.body.comment}, function(){
                // now update the related post to include the comment
                mongodb.collection('posts').updateOne(
                    { // find the post
                        postID: new ObjectID(req.body.postID)
                    },
                    {
                        $addToSet: {commentsIDList: newID}
                    }, function()
                    {
                        // the 204 status prevents naviagtion to a different page, it technically means "No content" which is kind of true
                        // since there is no content at this URL
                        res.status(204).end();
                    }
                );
            });
        }
        else
        {
            // otherwise this is a bad request
            res.status(400).end();
        }


    });


    // Reset the database.
    app.post('/resetdb', function(req, res) {
    console.log("Resetting database...");
    ResetDatabase(db, function() {
        res.send();
    });
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
