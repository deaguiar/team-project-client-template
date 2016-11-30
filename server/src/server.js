// Imports
var express = require('express');
var app = express();
var db = require('./database.js'); //Database.js import
var bodyParser = require('body-parser');

var port = 3000;

//Express
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(express.static("../client/build"));

/**
 * Get the user ID from a token. Returns -1 (an invalid ID)
 * if it fails.
 */
function getUserIdFromToken(authorizationLine) {
    try {
        var token = authorizationLine.slice(7);
        var regularString = new Buffer(token, 'base64').toString('utf8');
        var tokenObj = JSON.parse(regularString);
        var id = tokenObj['id'];
        if (typeof id === 'number') {
            return id;
        } else {
            return -1;
        }
    } catch (e) {
        return -1;
    }
}

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
})