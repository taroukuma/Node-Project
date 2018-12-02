// Import routes and helper functions
import { createFile, writeFile } from './model/createJson'
import { addCallback } from './controller/add'
import { getValueCallback } from './controller/getValue'
import { homeCallback } from './controller/home'
import { socketCall } from './model/socketLogic'

// Create an express app
let express = require('express')
let app = express()

// Socket.io imports
let server = require('http').Server(app)
let socketIO = require('socket.io')(server)

// Create JSON file
createFile()

// Routes
// Retrieve value given a key in the JSON file
app.get('/getValue', getValueCallback)

// Add to the jsonData
// socketCall closure emits an event to the clients
app.get('/add', function (req, res) {
  addCallback(req, res, socketCall(socketIO), writeFile)
})

// Home page
app.get('/', homeCallback)

// Reject invalid requests
app.all('/*', function (req, res) {
  res.status(400).send({ message: 'Invalid request!' })
})

// Start the server
server.listen(3000, function () {
  console.log('Listening on port 3000')
})
