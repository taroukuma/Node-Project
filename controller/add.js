import { pathToJson, jsonData } from '../model/createJson'
import { socketIO } from '../server'

let fs = require('fs')

// The callback
let addCallback = function (req, res, socketCall) {
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
      res.status(200).send('Successfully added.')
      socketCall()
    } else {
      res.status(400).send('Please provide a key and a value!')
    }
}

export { addCallback }
