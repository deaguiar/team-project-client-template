var ObjectID = require('mongodb').ObjectID;

// Put your startup's name here (only letters and numbers -- no spaces, apostrophes, or special characters!)
var databaseName = "GeoPost";
// Put the initial mock objects here.
var initialData = {

    "users":
        {
            // This user has id "1".
            "1":
                {
                    "_id": new ObjectID("000000000000000000000001"),
                    "fullName": "Person 1",
                    "pic": "img/profile_img.jpg",
                    "chat": -1,
                    "post": "Person 1's post"

                },
            "2":
                {
                    "_id": new ObjectID("000000000000000000000002"),
                    "fullName": "Person 2",
                    "pic": "img/BibleThump.png",
                    "chat": -1,
                    "post": "Person 2's post"
                },
            "3":
                {
                    "_id": new ObjectID("000000000000000000000003"),
                    "fullName": "Tim Richards",
                    "pic": "img/kappa.png",
                    "chat": new ObjectID("000000000000000000000003"),
                    "userName": "Orange",
                    "email": "tm_orange@something.com",
                    "city": "Amherst",
                    "post": "You guys you have to 'react' fast to the changes in the web world..."
                }
        },
    "posts":
        {
            "0":
                {
                    "postID": new ObjectID("000000000000000000000001"),
                    "user": new ObjectID("000000000000000000000001"),
                    "showComments": false,
                    "date": 1451606400,
                    "upvotes": 127,
                    "downvotes": 6790,
                    "lat": 42.389825,
                    "long": -72.528267,
                    "commentsIDList": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")], // when implementing comments, store them by ID so they can be ontained easily
                    "postText": "Lorem ipsum dolor sit amet, ut sit, lobortis eros arcu et imperdiet elit, dolor rhoncus ipsum placerat. Leo eu. Eleifend metus, sem amet egestas diam lorem. Duis dui, mollis cras arcu eget dignissim. Phasellus quam className, gravida ut ut ligula accumsan odio. Eget congue. Ac nec tortor feugiat urna feugiat vivamus, leo interdum, integer neque at justo ac justo, eu duis augue nulla, in tincidunt curabitur eleifend ac. Mauris suspendisse, vel quisque mauris id quis nullam mi, ante quam quam lobortis sed vestibulum pede, risus ut in risus tincidunt at.Morbi at rerum. Pellentesque nunc euismod non id, malesuada euismod. Rerum sapien placerat potenti nunc commodo ullamcorper, lectus tempus fusce massa rutrum sit. Curabitur velit egestas id est, justo enim imperdiet, eget commodo tortor, integer venenatis sagittis, mollis dolor pellentesque. Quisque vehicula venenatis massa, pede in interdum metus, iaculis gravida quam ultrices euismod est, vestibulum ut ultricies nec consectetuer quis. Cras platea id vestibulum tellus nam euismod. Non dictum, diam pede lorem a, ultrices molestiae morbi sed. Purus pulvinar, molestie ut, eu hendrerit ac a dictum eleifend, consequat mattis in sed, arcu nec vestibulum sit sociosqu turpis. Amet quis amet enim dictum, erat nulla nulla amet erat eros placerat, mattis non nunc justo varius lectus a, sed massa sunt vestibulum, turpis lorem. Et et. Potenti massa, nec ut litora ipsum, enim ante nec semper ante duis. Sed eget blandit, mi vestibulum augue placerat vulputate sed, porttitor consectetuer sed mauris veritatis, eget dis accumsan sed pellentesque commodo imperdiet.Sem cras. Per ullamcorper in fusce duis varius porttitor, ut mi ante justo iaculis. Ligula quam, non quam id suspendisse ac wisi, curabitur justo nisl at nec sem, scelerisque aliquam nam, sem lacus erat donec vel. Quis sed at, turpis lectus, tempor mattis morbi luctus magna euismod nam, mauris tincidunt. In ante dignissim nullam natoque leo. Lectus accumsan nulla a pellentesque. Eu est fusce vel, quis sed ipsum senectus non eget, molestie sociis vestibulum fusce justo, rutrum ornare non. Turpis in mollitia dolor, mi etiam massa vulputate lobortis, imperdiet convallis ipsum optio sodales lorem et, faucibus adipiscing nunc ut mauris est ornare. Lacus mollis blandit ullamcorper eu amet. At aliquam mauris cras. Id integer ligula pellentesque eget vehicula nec.Euismod libero vivamus dignissim mi, aliquam neque malesuada suscipit, eu quisque aliquam quam quisque, cupiditate nam. Nam vitae amet urna suspendisse dolorum nisi, proin proin rhoncus aliquet tellus. Enim nam nullam molestias vestibulum suscipit. Viverra vitae leo nam. Ullamcorper ornare, tellus pretium tempus viverra sem, vestibulum vestibulum tempor tristique nibh, et orci at. Lectus lacus congue nec placerat dignissim ut. Sagittis nisl pharetra, proin ipsum feugiat ac iaculis aliquam porta, diam ut at. Nibh erat, in nec amet ut ac nunc erat, phasellus tempus metus, faucibus ante odio interdum convallis venenatis. Erat sagittis aliquam nam vestibulum venenatis porttitor, lobortis volutpat et, integer vestibulum aenean vivamus nisl est, sed suscipit, quam cras metus lacus at est pellentesque. Dictum cubilia cras, integer fusce justo, vel mi, nunc consectetuer ipsum enim inceptos nam erat. Nulla vel, erat ante leo ullamcorper diam fringilla, felis luctus mauris, donec mi fusce posuere sit rhoncus."
                },
            "1":
                {
                    "postID": new ObjectID("000000000000000000000002"),
                    "user": new ObjectID("000000000000000000000003"),
                    "showComments": false,
                    "date": 1478979886,
                    "upvotes": 1023,
                    "downvotes": 12,
                    "lat": 42.3601,
                    "long":  -71.0589,
                    "commentsIDList": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")], // when implementing comments, store them by ID so they can be ontained easily
                    "postText": "Lorem ipsum dolor sit amet, ut sit, lobortis eros arcu et imperdiet elit, dolor rhoncus ipsum placerat. Leo eu. Eleifend metus, sem amet egestas diam lorem. Duis dui, mollis cras arcu eget dignissim. Phasellus quam className, gravida ut ut ligula accumsan odio. Eget congue. Ac nec tortor feugiat urna feugiat vivamus, leo interdum, integer neque at justo ac justo, eu duis augue nulla, in tincidunt curabitur eleifend ac. Mauris suspendisse, vel quisque mauris id quis nullam mi, ante quam quam lobortis sed vestibulum pede, risus ut in risus tincidunt at.Morbi at rerum. Pellentesque nunc euismod non id, malesuada euismod. Rerum sapien placerat potenti nunc commodo ullamcorper, lectus tempus fusce massa rutrum sit. Curabitur velit egestas id est, justo enim imperdiet, eget commodo tortor, integer venenatis sagittis, mollis dolor pellentesque. Quisque vehicula venenatis massa, pede in interdum metus, iaculis gravida quam ultrices euismod est, vestibulum ut ultricies nec consectetuer quis. Cras platea id vestibulum tellus nam euismod. Non dictum, diam pede lorem a, ultrices molestiae morbi sed. Purus pulvinar, molestie ut, eu hendrerit ac a dictum eleifend, consequat mattis in sed, arcu nec vestibulum sit sociosqu turpis. Amet quis amet enim dictum, erat nulla nulla amet erat eros placerat, mattis non nunc justo varius lectus a, sed massa sunt vestibulum, turpis lorem. Et et. Potenti massa, nec ut litora ipsum, enim ante nec semper ante duis. Sed eget blandit, mi vestibulum augue placerat vulputate sed, porttitor consectetuer sed mauris veritatis, eget dis accumsan sed pellentesque commodo imperdiet.Sem cras. Per ullamcorper in fusce duis varius porttitor, ut mi ante justo iaculis. Ligula quam, non quam id suspendisse ac wisi, curabitur justo nisl at nec sem, scelerisque aliquam nam, sem lacus erat donec vel. Quis sed at, turpis lectus, tempor mattis morbi luctus magna euismod nam, mauris tincidunt. In ante dignissim nullam natoque leo. Lectus accumsan nulla a pellentesque. Eu est fusce vel, quis sed ipsum senectus non eget, molestie sociis vestibulum fusce justo, rutrum ornare non. Turpis in mollitia dolor, mi etiam massa vulputate lobortis, imperdiet convallis ipsum optio sodales lorem et, faucibus adipiscing nunc ut mauris est ornare. Lacus mollis blandit ullamcorper eu amet. At aliquam mauris cras. Id integer ligula pellentesque eget vehicula nec.Euismod libero vivamus dignissim mi, aliquam neque malesuada suscipit, eu quisque aliquam quam quisque, cupiditate nam. Nam vitae amet urna suspendisse dolorum nisi, proin proin rhoncus aliquet tellus. Enim nam nullam molestias vestibulum suscipit. Viverra vitae leo nam. Ullamcorper ornare, tellus pretium tempus viverra sem, vestibulum vestibulum tempor tristique nibh, et orci at. Lectus lacus congue nec placerat dignissim ut. Sagittis nisl pharetra, proin ipsum feugiat ac iaculis aliquam porta, diam ut at. Nibh erat, in nec amet ut ac nunc erat, phasellus tempus metus, faucibus ante odio interdum convallis venenatis. Erat sagittis aliquam nam vestibulum venenatis porttitor, lobortis volutpat et, integer vestibulum aenean vivamus nisl est, sed suscipit, quam cras metus lacus at est pellentesque. Dictum cubilia cras, integer fusce justo, vel mi, nunc consectetuer ipsum enim inceptos nam erat. Nulla vel, erat ante leo ullamcorper diam fringilla, felis luctus mauris, donec mi fusce posuere sit rhoncus."
                },
            "2":
                {
                    "postID": new ObjectID("000000000000000000000003"),
                    "user": new ObjectID("000000000000000000000002"),
                    "showComments": false,
                    "date": 1506353372,
                    "upvotes": 4649,
                    "downvotes": 3939,
                    "lat": 42.3698,
                    "long":  -71.0586,
                    "commentsIDList": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")], // when implementing comments, store them by ID so they can be ontained easily
                    "postText": "(ง •̀_•́)ง THIS IS OUR TOWN SCRUB (ง •̀_•́)ง \n (ง •̀_•́)ง Yeah, beat it! (ง •̀_•́)ง."
                },
            "3":
                {
                    "postID": new ObjectID("000000000000000000000004"),
                    "user": new ObjectID("000000000000000000000002"),
                    "showComments": false,
                    "date": 1530000000,
                    "upvotes": 1337,
                    "downvotes": 42,
                    "lat": 42.3604,
                    "long":  -71.0592,
                    "commentsIDList": [new ObjectID("000000000000000000000001"),new ObjectID("000000000000000000000002")], // when implementing comments, store them by ID so they can be ontained easily
                    "postText": "(ง •̀_•́)ง THIS IS OUR TOWN SCRUBS (ง •̀_•́)ง \n (ง •̀_•́)ง Yeah, beat it! (ง •̀_•́)ง."
                },
            "4":
                {
                    "postID": new ObjectID("000000000000000000000005"),
                    "user": new ObjectID("000000000000000000000002"),
                    "showComments": false,
                    "date": 1560000000,
                    "upvotes": 9001,
                    "downvotes": 402,
                    "lat": 42.2626,
                    "long":  -71.8023,
                    "commentsIDList": [], // when implementing comments, store them by ID so they can be obtained easily
                    "postText": "(ง •̀_•́)ง THIS IS OUR TOWN SCRUBs (ง •̀_•́)ง \n (ง •̀_•́)ง Yeah, beat it! (ง •̀_•́)ง."
                }
        },
    "comments":
        {
            "0":
                {
                    "_id": new ObjectID("000000000000000000000001"),
                    "user": new ObjectID("000000000000000000000001"),
                    "commentText": "What does that text mean?"
                },
            "1":
                {
                    "_id": new ObjectID("000000000000000000000002"),
                    "user": new ObjectID("000000000000000000000002"),
                    "commentText": "It's just some meaningless filler text..."
                }
        },
    "messages":
        {
            "3":
                {
                    "_id": new ObjectID("000000000000000000000003"),
                    "chatOwner": new ObjectID("000000000000000000000003"),
                    "chats": [
                        {
                            "chatID": new ObjectID("000000000000000000000001"),//id of user in the chat
                            "chatName": "Person 1",
                            "read": true,
                            "messages": [
                                {"from": new ObjectID("000000000000000000000001"),
                                    "message": "Why won't my messages save!!",
                                    "timestamp": 34564567
                                },
                                {"from": new ObjectID("000000000000000000000003"),
                                    "message": "Because you are doing it wrong...",
                                    "timestamp": 35476458
                                }]
                        },{
                            "chatID": new ObjectID("000000000000000000000002"),//id of user in the chat
                            "chatName": "Person 2",
                            "read": false,
                            "messages": [
                                {"from": new ObjectID("000000000000000000000002"),
                                    "message": "Why won't my messages save!!",
                                    "timestamp": 34564567
                                },
                                {"from": new ObjectID("000000000000000000000003"),
                                    "message": "Check it homie...",
                                    "timestamp": 35476458
                                }]
                        }
                    ]
                }
        },
        "feed":
            {
                "3":
                    {
                        "_id": new ObjectID("000000000000000000000003"),
                        "Owner": new ObjectID("000000000000000000000003"),
                        "posts": [
                            {
                                "feedID": new ObjectID("000000000000000000000001"),//id of user in the chat
                                "chatName": "Person 1",
                                "read": true,
                                "feed": [
                                    {"from": new ObjectID("000000000000000000000001"),
                                        "message": "my feeed"

                                    },
                                    {"from": new ObjectID("000000000000000000000003"),
                                        "message": "Because you are doing it right..."

                                    }]
                            },{
                                "feedID": new ObjectID("000000000000000000000002"),//id of user in the chat
                                "chatName": "Person 2",
                                "read": false,
                                "feed": [
                                    {"from": new ObjectID("000000000000000000000002"),
                                        "message": "Why won't my messages save!!"

                                    },
                                    {"from": new ObjectID("000000000000000000000003"),
                                        "message": "Check it homie..."

                                    }]
                            }
                        ]
                    }
            }

};


/**
 * Resets a collection.
 */
function resetCollection(db, name, cb) {
  // Drop / delete the entire object collection.
  db.collection(name).drop(function() {
    // Get all of the mock objects for this object collection.
    var collection = initialData[name];
    var objects = Object.keys(collection).map(function(key) {
      return collection[key];
    });
    // Insert objects into the object collection.
    db.collection(name).insertMany(objects, function()
    {
        // build the text index to search by
        if (name === "posts")
        {
            console.log("Building search index for posts...");
            db.collection(name).createIndex({postText: "text"}, function(err)
            {
                console.log("Finished building search index for posts...");
                cb();
            });
        }
        else
        {
            cb();
        }
    });
  });
}

/**
 * Reset the MongoDB database.
 * @param db The database connection.
 */
function resetDatabase(db, cb) {
  // The code below is a bit complex, but it basically emulates a
  // "for" loop over asynchronous operations.
  var collections = Object.keys(initialData);
  var i = 0;

  // Processes the next collection in the collections array.
  // If we have finished processing all of the collections,
  // it triggers the callback.
  function processNextCollection() {
    if (i < collections.length) {
      var collection = collections[i];
      i++;
      // Use myself as a callback.
      resetCollection(db, collection, processNextCollection);
    } else {
      cb();
    }
  }

  // Start processing the first collection!
  processNextCollection();
}

// Check if called directly via 'node', or required() as a module.
// http://stackoverflow.com/a/6398335
if(require.main === module) {
  // Called directly, via 'node src/resetdatabase.js'.
  // Connect to the database, and reset it!
  var MongoClient = require('mongodb').MongoClient;
  var url = 'mongodb://localhost:27017/' + databaseName;
  MongoClient.connect(url, function(err, db) {
    if (err) {
      throw new Error("Could not connect to database: " + err);
    } else {
      console.log("Resetting database...");
      resetDatabase(db, function() {
        console.log("Database reset!");
        // Close the database connection so NodeJS closes.
        db.close();
      });
    }
  });
} else {
  // require()'d.  Export the function.
  module.exports = resetDatabase;
}
