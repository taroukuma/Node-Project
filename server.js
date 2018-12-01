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
let fs = require('fs')
let pathToJson = path.resolve('jsonFile.json')

fs.readFile(pathToJson, 'utf8', function (err, data) {
    fs.writeFile(pathToJson, '', function () { console.log('New JSON file created.') })
})

// Routes

// Add to the jsonData
app.get('/add', function (req, res) {
  // Get the query string
  let key = req.query.key
  let val = req.query.val

  // Validation check
  if (val && key) {
    // Add the key, value pair to the jsonData
    jsonData[key] = val

    // Update the JSON file
    fs.writeFile(pathToJson, JSON.stringify(jsonData), function () { console.log('JSON file updated.') })

    // Send a success message and emit a socket event
    res.send('Successfully added.')
    socketIO.emit('update', JSON.stringify(jsonData))
  } else {
    res.status(400).send({ message: 'Please provide a key and a value!' })
  }
})

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

// Export app
export {app}