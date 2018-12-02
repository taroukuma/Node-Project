import { jsonData } from '../model/createJson'

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

export { getValueCallback }
