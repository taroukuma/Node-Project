// Create an express app
// Create JSON file
import { createFile } from './model/createJson'

// Routes
// Add to the jsonData
import addRouter from './controller/add'

// Retrieve value given a key in the JSON file
import getValueRouter from './controller/getValue'

// Home page
import homeRouter from './controller/home'

let express = require('express')
let app = express()

// Socket.io imports
let server = require('http').Server(app)
let socketIO = require('socket.io')(server)

// The data object
global.jsonData = {}
createFile()
app.use('/add', addRouter)
app.use('/getvalue', getValueRouter)
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
