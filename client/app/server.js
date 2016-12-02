
import {readDocument, writeDocument, sendXHR} from './database.js';

/**
 * Emulates how a REST call is *asynchronous* -- it calls your function back
 * some time in the future with data.
 */
function emulateServerReturn(data, cb) {
  setTimeout(() => {
    cb(data);
  }, 4);
}

export function getUserData(userID, cb)
{
  sendXHR('GET', '/user/' + userID,
      undefined, (xhr) => {
      cb(JSON.parse(xhr.responseText));
  });
}

export function getMessageList(user, cb) {
    sendXHR('GET', '/' + user + '/messages',
        undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function readMessage(user, id, cb) {
    sendXHR('PUT', '/' + user + '/message/' + id + '/read',
        undefined, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function messageUser(user1ID, chatID, text, cb) {
    sendXHR('PUT', '/' + user1ID + '/message', {
        "from": user1ID,
        "chat": chatID,
        "message": text
    }, (xhr) => {
        cb(JSON.parse(xhr.responseText));
    });
}

export function getAllPostsWithText(text, cb, t)
{
  sendXHR('GET', '/search/' + text, {
  }, (xhr) => {
      cb(JSON.parse(xhr.responseText), t);
  });
}

// algorithm for hot posts described in server
export function getTopXHotPosts(X, cb, t)
{
  sendXHR('GET', '/hot/' + X, {
  }, (xhr) => {
      cb(JSON.parse(xhr.responseText), t);
  });
}

/**
 * Adds a new comment to the database on the given feed item.
 */
 export function getAllCommentsForAPost(postID, cb, t) {
     sendXHR('GET', '/getcomments/' + postID,{}, (xhr) => {
         cb(JSON.parse(xhr.responseText), t);
     });
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
