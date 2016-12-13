import React from 'react';
import ReactDOM from 'react-dom';

// Modify with your startup's name!
var startupName = 'Geopost';

// Your startup's initial mock objects go here
var initialData = {
    "users":
        {
            // This user has id "1".
            "1":
                {
                    "_id": 1,
                    "fullName": "Person 1",
                    "pic": "img/profile_img.jpg",
                    "chat": -1
                },
            "2":
                {
                    "_id": 2,
                    "fullName": "Person 2",
                    "pic": "img/BibleThump.png",
                    "chat": -1
                },
            "3":
                {
                    "_id": 3,
                    "fullName": "Tim Richards",
                    "pic": "img/kappa.png",
                    "text": "this feed is still a work in progress",
                    "chat": 3,
                    "settings":[
                        {
                            "userName": "Orange",
                            "email": "tm_orange@something.com",
                            "city": "Amherst"
                        }
                    ]
                }
        },
    "posts":
        {
            "0":
                {
                    // this is the meta-post entry, keeps track of # of posts to search through
                    // make sure to update this if you add / delete a post
                    "count": 5
                },
            "1":
                {
                    "postID": 1,
                    "user": 1,
                    "showComments": false,
                    "date": 1451606400,
                    "upvotes": 127,
                    "downvotes": 6790,
                    "lat": 42.389825,
                    "long": -72.528267,
                    "commentsIDList": [1,2], // when implementing comments, store them by ID so they can be ontained easily
                    "postText": "Lorem ipsum dolor sit amet, ut sit, lobortis eros arcu et imperdiet elit, dolor rhoncus ipsum placerat. Leo eu. Eleifend metus, sem amet egestas diam lorem. Duis dui, mollis cras arcu eget dignissim. Phasellus quam className, gravida ut ut ligula accumsan odio. Eget congue. Ac nec tortor feugiat urna feugiat vivamus, leo interdum, integer neque at justo ac justo, eu duis augue nulla, in tincidunt curabitur eleifend ac. Mauris suspendisse, vel quisque mauris id quis nullam mi, ante quam quam lobortis sed vestibulum pede, risus ut in risus tincidunt at.Morbi at rerum. Pellentesque nunc euismod non id, malesuada euismod. Rerum sapien placerat potenti nunc commodo ullamcorper, lectus tempus fusce massa rutrum sit. Curabitur velit egestas id est, justo enim imperdiet, eget commodo tortor, integer venenatis sagittis, mollis dolor pellentesque. Quisque vehicula venenatis massa, pede in interdum metus, iaculis gravida quam ultrices euismod est, vestibulum ut ultricies nec consectetuer quis. Cras platea id vestibulum tellus nam euismod. Non dictum, diam pede lorem a, ultrices molestiae morbi sed. Purus pulvinar, molestie ut, eu hendrerit ac a dictum eleifend, consequat mattis in sed, arcu nec vestibulum sit sociosqu turpis. Amet quis amet enim dictum, erat nulla nulla amet erat eros placerat, mattis non nunc justo varius lectus a, sed massa sunt vestibulum, turpis lorem. Et et. Potenti massa, nec ut litora ipsum, enim ante nec semper ante duis. Sed eget blandit, mi vestibulum augue placerat vulputate sed, porttitor consectetuer sed mauris veritatis, eget dis accumsan sed pellentesque commodo imperdiet.Sem cras. Per ullamcorper in fusce duis varius porttitor, ut mi ante justo iaculis. Ligula quam, non quam id suspendisse ac wisi, curabitur justo nisl at nec sem, scelerisque aliquam nam, sem lacus erat donec vel. Quis sed at, turpis lectus, tempor mattis morbi luctus magna euismod nam, mauris tincidunt. In ante dignissim nullam natoque leo. Lectus accumsan nulla a pellentesque. Eu est fusce vel, quis sed ipsum senectus non eget, molestie sociis vestibulum fusce justo, rutrum ornare non. Turpis in mollitia dolor, mi etiam massa vulputate lobortis, imperdiet convallis ipsum optio sodales lorem et, faucibus adipiscing nunc ut mauris est ornare. Lacus mollis blandit ullamcorper eu amet. At aliquam mauris cras. Id integer ligula pellentesque eget vehicula nec.Euismod libero vivamus dignissim mi, aliquam neque malesuada suscipit, eu quisque aliquam quam quisque, cupiditate nam. Nam vitae amet urna suspendisse dolorum nisi, proin proin rhoncus aliquet tellus. Enim nam nullam molestias vestibulum suscipit. Viverra vitae leo nam. Ullamcorper ornare, tellus pretium tempus viverra sem, vestibulum vestibulum tempor tristique nibh, et orci at. Lectus lacus congue nec placerat dignissim ut. Sagittis nisl pharetra, proin ipsum feugiat ac iaculis aliquam porta, diam ut at. Nibh erat, in nec amet ut ac nunc erat, phasellus tempus metus, faucibus ante odio interdum convallis venenatis. Erat sagittis aliquam nam vestibulum venenatis porttitor, lobortis volutpat et, integer vestibulum aenean vivamus nisl est, sed suscipit, quam cras metus lacus at est pellentesque. Dictum cubilia cras, integer fusce justo, vel mi, nunc consectetuer ipsum enim inceptos nam erat. Nulla vel, erat ante leo ullamcorper diam fringilla, felis luctus mauris, donec mi fusce posuere sit rhoncus."
                },
            "2":
                {
                    "postID": 2,
                    "user": 3,
                    "showComments": false,
                    "date": 1478979886,
                    "upvotes": 1023,
                    "downvotes": 12,
                    "lat": 42.3601,
                    "long":  -71.0589,
                    "commentsIDList": [1,2], // when implementing comments, store them by ID so they can be ontained easily
                    "postText": "Lorem ipsum dolor sit amet, ut sit, lobortis eros arcu et imperdiet elit, dolor rhoncus ipsum placerat. Leo eu. Eleifend metus, sem amet egestas diam lorem. Duis dui, mollis cras arcu eget dignissim. Phasellus quam className, gravida ut ut ligula accumsan odio. Eget congue. Ac nec tortor feugiat urna feugiat vivamus, leo interdum, integer neque at justo ac justo, eu duis augue nulla, in tincidunt curabitur eleifend ac. Mauris suspendisse, vel quisque mauris id quis nullam mi, ante quam quam lobortis sed vestibulum pede, risus ut in risus tincidunt at.Morbi at rerum. Pellentesque nunc euismod non id, malesuada euismod. Rerum sapien placerat potenti nunc commodo ullamcorper, lectus tempus fusce massa rutrum sit. Curabitur velit egestas id est, justo enim imperdiet, eget commodo tortor, integer venenatis sagittis, mollis dolor pellentesque. Quisque vehicula venenatis massa, pede in interdum metus, iaculis gravida quam ultrices euismod est, vestibulum ut ultricies nec consectetuer quis. Cras platea id vestibulum tellus nam euismod. Non dictum, diam pede lorem a, ultrices molestiae morbi sed. Purus pulvinar, molestie ut, eu hendrerit ac a dictum eleifend, consequat mattis in sed, arcu nec vestibulum sit sociosqu turpis. Amet quis amet enim dictum, erat nulla nulla amet erat eros placerat, mattis non nunc justo varius lectus a, sed massa sunt vestibulum, turpis lorem. Et et. Potenti massa, nec ut litora ipsum, enim ante nec semper ante duis. Sed eget blandit, mi vestibulum augue placerat vulputate sed, porttitor consectetuer sed mauris veritatis, eget dis accumsan sed pellentesque commodo imperdiet.Sem cras. Per ullamcorper in fusce duis varius porttitor, ut mi ante justo iaculis. Ligula quam, non quam id suspendisse ac wisi, curabitur justo nisl at nec sem, scelerisque aliquam nam, sem lacus erat donec vel. Quis sed at, turpis lectus, tempor mattis morbi luctus magna euismod nam, mauris tincidunt. In ante dignissim nullam natoque leo. Lectus accumsan nulla a pellentesque. Eu est fusce vel, quis sed ipsum senectus non eget, molestie sociis vestibulum fusce justo, rutrum ornare non. Turpis in mollitia dolor, mi etiam massa vulputate lobortis, imperdiet convallis ipsum optio sodales lorem et, faucibus adipiscing nunc ut mauris est ornare. Lacus mollis blandit ullamcorper eu amet. At aliquam mauris cras. Id integer ligula pellentesque eget vehicula nec.Euismod libero vivamus dignissim mi, aliquam neque malesuada suscipit, eu quisque aliquam quam quisque, cupiditate nam. Nam vitae amet urna suspendisse dolorum nisi, proin proin rhoncus aliquet tellus. Enim nam nullam molestias vestibulum suscipit. Viverra vitae leo nam. Ullamcorper ornare, tellus pretium tempus viverra sem, vestibulum vestibulum tempor tristique nibh, et orci at. Lectus lacus congue nec placerat dignissim ut. Sagittis nisl pharetra, proin ipsum feugiat ac iaculis aliquam porta, diam ut at. Nibh erat, in nec amet ut ac nunc erat, phasellus tempus metus, faucibus ante odio interdum convallis venenatis. Erat sagittis aliquam nam vestibulum venenatis porttitor, lobortis volutpat et, integer vestibulum aenean vivamus nisl est, sed suscipit, quam cras metus lacus at est pellentesque. Dictum cubilia cras, integer fusce justo, vel mi, nunc consectetuer ipsum enim inceptos nam erat. Nulla vel, erat ante leo ullamcorper diam fringilla, felis luctus mauris, donec mi fusce posuere sit rhoncus."
                },
            "3":
                {
                    "postID": 3,
                    "user": 2,
                    "showComments": false,
                    "date": 1506353372,
                    "upvotes": 4649,
                    "downvotes": 3939,
                    "lat": 42.3698,
                    "long":  -71.0586,
                    "commentsIDList": [1,2], // when implementing comments, store them by ID so they can be ontained easily
                    "postText": "(ง •̀_•́)ง THIS IS OUR TOWN SCRUB (ง •̀_•́)ง \n (ง •̀_•́)ง Yeah, beat it! (ง •̀_•́)ง."
                },
            "4":
                {
                    "postID": 4,
                    "user": 2,
                    "showComments": false,
                    "date": 1530000000,
                    "upvotes": 1337,
                    "downvotes": 42,
                    "lat": 42.3604,
                    "long":  -71.0592,
                    "commentsIDList": [1,2], // when implementing comments, store them by ID so they can be ontained easily
                    "postText": "(ง •̀_•́)ง THIS IS OUR TOWN SCRUBS (ง •̀_•́)ง \n (ง •̀_•́)ง Yeah, beat it! (ง •̀_•́)ง."
                },
            "5":
                {
                    "postID": 5,
                    "user": 2,
                    "showComments": false,
                    "date": 1560000000,
                    "upvotes": 9001,
                    "downvotes": 402,
                    "lat": 42.3601,
                    "long":  -71.0589,
                    "commentsIDList": [], // when implementing comments, store them by ID so they can be ontained easily
                    "postText": "(ง •̀_•́)ง THIS IS OUR TOWN SCRUBs (ง •̀_•́)ง \n (ง •̀_•́)ง Yeah, beat it! (ง •̀_•́)ง."
                }
        },
    "comments":
        {
            "0":
                {
                    "count": 2
                },
            "1":
                {
                    "user": 1,
                    "commentText": "What does that text mean?"
                },
            "2":
                {
                    "user": 2,
                    "commentText": "It's just some meaningless filler text..."
                }
        },
    "messages":
        {
            "3":
                {
                    "_id": 3,
                    "chatOwner": 3,
                    "chats": [
                        {
                            "chatID": 1,//id of user in the chat
                            "chatName": "Person 1",
                            "read": true,
                            "messages": [
                                {"from": 1,
                                    "message": "Why won't my messages save!!",
                                    "timestamp": 34564567
                                },
                                {"from": 3,
                                    "message": "Because you are doing it wrong...",
                                    "timestamp": 35476458
                                }]
                        },{
                            "chatID": 2,//id of user in the chat
                            "chatName": "Person 2",
                            "read": false,
                            "messages": [
                                {"from": 2,
                                    "message": "Why won't my messages save!!",
                                    "timestamp": 34564567
                                },
                                {"from": 3,
                                    "message": "Check it homie...",
                                    "timestamp": 35476458
                                }]
                        },
                    ]
                }
        }
};


var data = JSON.parse(localStorage.getItem(startupName));
if (data === null) {
  data = JSONClone(initialData);
}

/**
 * A dumb cloning routing. Serializes a JSON object as a string, then
 * deserializes it.
 */
function JSONClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

/**
 * Emulates reading a "document" from a NoSQL database.
 * Doesn't do any tricky document joins, as we will cover that in the latter
 * half of the course. :)
 */
export function readDocument(collection, id) {
  // Clone the data. We do this to model a database, where you receive a
  // *copy* of an object and not the object itself.
  return JSONClone(data[collection][id]);
}

/**
 * Emulates writing a "document" to a NoSQL database.
 */
export function writeDocument(collection, changedDocument) {
  var id = changedDocument._id;
  // Store a copy of the object into the database. Models a database's behavior.
  data[collection][id] = JSONClone(changedDocument);
  // Update our 'database'.
  localStorage.setItem(startupName, JSON.stringify(data));
}

/**
 * Adds a new document to the NoSQL database.
 */
export function addDocument(collectionName, newDoc) {
  var collection = data[collectionName];
  var nextId = Object.keys(collection).length;

  while (collection[nextId]) {
    nextId++;
  }
  newDoc._id = nextId;
  writeDocument(collectionName, newDoc);
  return newDoc;
}

/**
 * Reset our browser-local database.
 */
export function resetDatabase() {
  localStorage.setItem(startupName, JSON.stringify(initialData));
  data = JSONClone(initialData);
}

var token = 'eyJpZCI6M30='; //same token i used for workshop
export function sendXHR(verb, resource, body, cb) {
    var xhr = new XMLHttpRequest();
    xhr.open(verb, resource);
    xhr.setRequestHeader('Authorization', 'Bearer ' + token);
    xhr.addEventListener('load', function() {
        var statusCode = xhr.status;
        var statusText = xhr.statusText;
        if (statusCode >= 200 && statusCode < 300) {
            cb(xhr);
        } else {
            var responseText = xhr.responseText;
            /*FacebookError('Could not ' + verb + " " + resource + ": Received " +
             statusCode + " " + statusText + ": " + responseText);*/
        }
    });
    xhr.timeout = 10000;
    /*xhr.addEventListener('error', function() {
     FacebookError('Could not ' + verb + " " + resource +
     ": Could not connect to the server.");
     });
     xhr.addEventListener('timeout', function() {
     FacebookError('Could not ' + verb + " " + resource +
     ": Request timed out.");
     });*/
    switch (typeof(body)) {
        case 'undefined':
            xhr.send();
            break;
        case 'string':
            xhr.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
            xhr.send(body);
            break;
        case 'object':
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(body));
            break;
        default:
            throw new Error('Unknown body type: ' + typeof(body));
    }
}

/**
 * Reset database button.
 */
 /*
class ResetDatabase extends React.Component {
  render() {
    return (
      <button className="btn btn-default" type="button" onClick={() => {
        resetDatabase();
        window.alert("Database reset! Refreshing the page now...");
        document.location.reload(false);
      }}>Reset Mock DB</button>
    );
  }
}*/

/*
ReactDOM.render(
  <ResetDatabase />,
  document.getElementById('db-reset')
);*/
