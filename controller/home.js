// Path imports
let path = require('path')

// The callback
let homeCallback = function (req, res) {
  return res.sendFile(path.resolve('views/index.html'))
}

export { homeCallback }
