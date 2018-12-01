'use strict';

// Create an express app
var express = require('express');
var app = express();
var path = require('path');

// Socket.io imports
var server = require('http').Server(app);
var socketIO = require('socket.io')(server);

// The data object
var jsonData = {};

// Read data from json file
var fs = require('fs');
var pathToJson = path.resolve(__dirname, 'jsonFile.json');

fs.readFile(pathToJson, 'utf8', function (err, data) {
  // Populate jsonData if the file exits
  if (!err) {
    jsonData = JSON.parse(data);
    // If no file exits, create it
  } else {
    fs.writeFile(pathToJson, '', function () {
      console.log('New JSON file created.');
    });
  }
});

// Routes

// Add to the jsonData
app.get('/add', function (req, res) {
  // Get the query string
  var key = req.query.key;
  var val = req.query.val;

  // Validation check
  if (val && key) {
    // Add the key, value pair to the jsonData
    jsonData[key] = val;

    // Update the JSON file
    fs.writeFile(pathToJson, JSON.stringify(jsonData), function () {
      console.log('JSON file updated.');
    });

    // Send a success message and emit a socket event
    res.send('Successfully added.');
    socketIO.emit('update', JSON.stringify(jsonData));
  } else {
    res.status(400).send({ message: 'Please provide a key and a value!' });
  }
});

// Retrieve data from the jsonData
app.get('/getValueOf', function (req, res) {
  // Get the query string
  var key = req.query.key;
  var val = jsonData[key];

  // Validation check
  if (val) {
    res.send(val);
  } else {
    res.status(404).send({ message: 'Could not find the key!' });
  }
});

// The update channel aka the home page
app.get('/', function (req, res) {
  res.sendFile(path.resolve('views/index.html'));
});

// Reject invalid requests
app.all('/*', function (req, res) {
  res.status(400).send({ message: 'Invalid request!' });
});

// Start the server
server.listen(3000, function () {
  console.log('Listening on port 3000');
});