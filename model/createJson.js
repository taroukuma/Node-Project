let fs = require('fs')
let path = require('path')

// Define path to the JSON file
let pathToJson = path.resolve('jsonFile.json')

// The JSON object
let jsonData = {}

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

// Function that writes to the JSON file and updates it
let writeFile = function () {
  fs.writeFile(pathToJson, JSON.stringify(jsonData), function () { console.log('JSON file updated.') })
}

export { jsonData, pathToJson, createFile, writeFile }
