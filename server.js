// Create an express app
let express = require('express')
let app = express()
let path = require('path')

// Socket.io imports
let server = require('http').Server(app)
let socketIO = require('socket.io')(server)

// The data object
global.jsonData = {}

// Create JSON file
import {createFile} from './model/createJson'
createFile()

// Routes
// Add to the jsonData
import addRouter from './controller/add'
app.use('/add', addRouter)

// Retrieve value given a key in the JSON file
import getValueRouter from './controller/getValue'
app.use('/getvalue', getValueRouter)

// Home page
import homeRouter from './controller/home'
app.use('/', homeRouter)

// Reject invalid requests
app.all('/*', function (req, res) {
  res.status(400).send({ message: 'Invalid request!' })
})

// Start the server
server.listen(3000, function () {
  console.log('Listening on port 3000')
})

// Export
export {app, socketIO}