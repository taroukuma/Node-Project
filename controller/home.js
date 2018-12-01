// Express and path imports
let express = require('express')
let homeRouter = express.Router()
let path = require('path')

// The update channel aka the home page
homeRouter.get('/', function (req, res) {
  res.sendFile(path.resolve('views/index.html'))
})

export default homeRouter
