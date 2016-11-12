import {readDocument} from './database.js';

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
