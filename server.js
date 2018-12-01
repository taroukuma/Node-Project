// Import routes and helper functions
import { createFile } from './model/createJson'
import addRouter from './controller/add'
import getValueRouter from './controller/getValue'
import homeRouter from './controller/home'

// Create an express app
let express = require('express')
let app = express()

// Socket.io imports
let server = require('http').Server(app)
let socketIO = require('socket.io')(server)

// Create JSON file
createFile()

// Routes
// Add to the jsonData
app.use('/add', addRouter)
// Retrieve value given a key in the JSON file
app.use('/getvalue', getValueRouter)
// Home page
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
export { app, socketIO }
