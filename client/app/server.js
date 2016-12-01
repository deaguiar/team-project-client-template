import {readDocument, writeDocument,addDocument} from './database.js';


/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}


export function getUserData(userID)
{
  var userData = readDocument('users', userID);
  //emulateServerReturn(userData, cb);
  return userData;
}

export function readMessage(user, id, cb) {
    var usr = readDocument('users', user);

    usr.chats[id].read = true;
    writeDocument('users', usr);
    emulateServerReturn(usr, cb);
}

export function messageUser(user1ID, chatID, text, cb) {
    var user1 = readDocument("users", user1ID);

    user1.chats[chatID].messages.push( {
        "from": user1ID,
        "message": text,
        "timestamp": new Date().getTime()
    });
    //writeDocument("users", user1);
    emulateServerReturn(user1, cb);
}

export function getAllPostsWithText(text)
{
  var postData = readDocument('posts', 0);
  var resultsList = [];
  for (var i = 1; i <= postData.count; i++)
  {
    var result = readDocument('posts', i);
    if( result.postText.indexOf(text) >= 0)
    {
      resultsList.push(result);
    }
  }

  return resultsList;
}

export function getAllCommentsForAPost(postID)
{
 var postData = readDocument('posts', 0);
 for (var i = 1; i <= postData.count; i++)
 {
   var result = readDocument('posts', i);
   if (result.postID == postID)
   {
     var resultsList = [];
     var comments = readDocument('comments', 0);
     for(var count = 1; count <= comments.count; count++)
     {
       var result2 = readDocument('comments', count);
       if (result.commentsIDList.indexOf(count) >= 0)
         resultsList.push(result2);
     }
     return resultsList;
   }
 }
 return null;
}
/**
 * Adds a new comment to the database on the given feed item.
 */
 export function postComment(feedItemId, author, contents, cb) {
     sendXHR('POST', '/feeditem/' + feedItemId + '/comment', {
         userId: author,
         contents: contents
     }, (xhr) => {
         cb(JSON.parse(xhr.responseText));
     });
 }
export function postStatusUpdate(user, location, contents, cb) {

var newStatusUpdate = {
"likeCounter": [],
"type": "statusUpdate",
"contents": {
"author": user,
"contents": contents
},
// List of comments on the post
"comments": []
};
// Add the status update to the database.
// Returns the status update w/ an ID assigned.
newStatusUpdate = addDocument('feedItems', newStatusUpdate);
// Add the status update reference to the front of the
// current user's feed.
var userData = readDocument('users', user);
var feedData = readDocument('feeds', userData.feed);
feedData.contents.unshift(newStatusUpdate._id);
// Update the feed object.
writeDocument('feeds', feedData);
// Return the newly-posted object.
emulateServerReturn(newStatusUpdate, cb);
}
