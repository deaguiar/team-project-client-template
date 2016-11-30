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

export function getUserData(userID)
{
    //
  var userData = readDocument('users', userID);
  //emulateServerReturn(userData, cb);
  return userData;
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
