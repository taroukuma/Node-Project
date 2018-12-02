import { jsonData } from '../model/createJson'

// The callback
let getValueCallback = function (req, res) {
    // Get the query string
    let key = req.query.key
    // If no key is given, send status 400
    if (!key) {
        return res.status(400).send('No key provided!')
    }

    let val = jsonData[key]
  
    // Validation check
    if (val) {
      return res.status(200).send(val)
    } else {
      return res.status(404).send('Could not find the key!')
    }
}

export { getValueCallback }
