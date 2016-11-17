import {readDocument, writeDocument} from './database.js';

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

    writeDocument("users", user1);
    user1.chats[chatID].messages.push( {
        "from": user1ID,
        "message": text,
        "timestamp": new Date().getTime()
    });
    writeDocument("users", user1);
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
