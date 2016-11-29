// Implement your server in this file.
var express = require('express');
var app = express();
// We should be able to run your server with node src/server.js
// Starts the server on port 3000!
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});