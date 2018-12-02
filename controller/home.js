// Express and path imports
let express = require('express')
let homeRouter = express.Router()
let path = require('path')

// The callback
let homeCallback = function (req, res) {
    res.sendFile(path.resolve('views/index.html'))
}

// The update channel aka the home page
homeRouter.get('/', homeCallback)

export { homeRouter, homeCallback }
