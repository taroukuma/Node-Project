import { jsonData } from '../model/createJson'

// Express imports
let express = require('express')
let getValueRouter = express.Router()

// The callback
let getValueCallback = function (req, res) {
    // Get the query string
    let key = req.query.key
    let val = jsonData[key]
  
    // Validation check
    if (val) {
      res.status(200).send(val)
    } else {
      res.status(404).send('Could not find the key!')
    }
  }

// Route that gets queries from the jsonData
getValueRouter.get('/', getValueCallback)

export { getValueRouter, getValueCallback }
