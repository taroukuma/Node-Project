let fs = require('fs')
let path = require('path')

// Define path to the JSON file
let pathToJson = path.resolve('jsonFile.json')

// Function that creates the JSON file
let createFile = function () {
  fs.writeFile(pathToJson, '', function (err) {
    if (err) {
      console.log('Could not create the JSON file')
    } else {
      console.log('New JSON file created.')
    }
  })
}

export { pathToJson, createFile }
