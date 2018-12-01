// Express imports
let express = require('express')
let getValueRouter = express.Router()

getValueRouter.get('/', function (req, res) {
    // Get the query string
    let key = req.query.key
    let val = jsonData[key]
  
    // Validation check
    if (val) {
      res.send(val)
    } else {
      res.status(404).send({ message: 'Could not find the key!' })
    }
})

export default getValueRouter