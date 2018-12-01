// Create an express app
let express = require('express');
let app = express();

// Socket.io imports
let server = require('http').Server(app);
let socketIO = require('socket.io')(server);

// The data object
let jsonData = {};

// Read data from json file
let fs = require('fs');
fs.readFile(__dirname + '/jsonFile.json', 'utf8', function (err, data) {
    // Populate jsonData if the file exits
    if (! err) {
        jsonData = JSON.parse(data);
    }
    // If no file exits, create it
    else {
        fs.writeFile(__dirname + '/jsonFile.json', '', function () {console.log('New JSON file created.')});
    }
});


// Routes

// Add to the jsonData
app.get('/add', function (req, res) {
    // Get the query string
    let key = req.query.key;
    let val = req.query.val;

    // Validation check
    if (val && key) {
        // Add the key, value pair to the jsonData
        jsonData[key] = val;

        // Update the JSON file
        fs.writeFile(__dirname + '/jsonFile.json', JSON.stringify(jsonData), function () {console.log('JSON file updated.')})

        // Send a success message and emit a socket event
        res.send("Successfully added.")
        socketIO.emit('update', JSON.stringify(jsonData));
    }
    else {
        res.status(400).send({message: 'Please provide a key and a value!'});
    }
});

// Retrieve data from the jsonData
app.get('/getValueOf', function (req, res) {
    // Get the query string
    let key = req.query.key;
    let val = jsonData[key];

    // Validation check
    if (val) {
        res.send(val);
    }
    else {
        res.status(404).send({message: 'Could not find the key!'});
    }
});

// The update channel aka the home page
app.get('/', function (req, res) {
    res.sendFile(__dirname + '/views/index.html');
});

// Reject invalid requests
app.all('/*', function (req, res) {
    res.status(400).send({message: 'Invalid request!'});
})

// Start the server
server.listen(3000, function () {
    console.log('Listening on port 3000');
});