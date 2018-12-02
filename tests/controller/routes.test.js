// Import the callbacks for all the routes
import { homeCallback } from '../../controller/home'
import { getValueCallback } from '../../controller/getValue'
import { addCallback } from '../../controller/add'
import { jsonData } from '../../model/createJson'

// Import expect from chai
let chai = require('chai')
const expect = chai.expect

// Dummy params
let req = {}
let res = {}

// Tests for the route callbacks
describe('Testing all the route callbacks', function () {
  // boiler plate before each test
  beforeEach(function () {
    req = { query: {} }
    res = {
      file: '',
      sendFile: function (fileName) {
        this.file = fileName
      },
      statusCode: 0,
      statusMsg: '',
      status: function (code) {
        this.statusCode = code
        return {
          send: function (msg) {
            res.statusMsg = msg
          } }
      }
    }

    // Empty out the jsonData object
    Object.keys(jsonData).forEach(function (key) {
      delete jsonData[key]
    })
  })

  // home route
  it('home route should send the index.html file', function () {
    homeCallback(req, res)
    expect(res.file).to.contain('index.html')
  })

  // getValue route
  it('getValue route should give status 400 if a key is not provided', function () {
    getValueCallback(req, res)
    expect(res.statusCode).to.equal(400)
    expect(res.statusMsg).to.equal('No key provided!')
  })
  it('getValue route should give status 404 if the given key doesn\'t exit', function () {
    // populate the request object with a query parameter
    req.query['key'] = 'someKey'

    getValueCallback(req, res)
    expect(res.statusCode).to.equal(404)
    expect(res.statusMsg).to.equal('Could not find the key!')
  })
  it('getValue route should give status 200 and the value for the given key if the key exists', function () {
    req.query['key'] = 'someKey'
    jsonData['someKey'] = 'someValue'

    getValueCallback(req, res)
    expect(res.statusCode).to.equal(200)
    expect(res.statusMsg).to.equal('someValue')
  })

  // add route
  it('add route should give status 400 if a key is not given but a value is', function () {
    req.query['val'] = 'someValue'

    addCallback(req, res)
    expect(res.statusCode).to.equal(400)
    expect(res.statusMsg).to.equal('Please provide a key and a value!')
  })
  it('add route should give status 400 if a value is given but a key is not', function () {
    req.query['key'] = 'someKey'

    addCallback(req, res)
    expect(res.statusCode).to.equal(400)
    expect(res.statusMsg).to.equal('Please provide a key and a value!')
  })
  it('add route should give status 400 if neither a value nor a key is given', function () {
    addCallback(req, res)
    expect(res.statusCode).to.equal(400)
    expect(res.statusMsg).to.equal('Please provide a key and a value!')
  })
  it('add route should add a key and a value to jsonData, write to file, and make socket call if the key and the value are given', function () {
    req.query['key'] = 'someKey'
    req.query['val'] = 'someValue'

    let socketMsg = ''
    let socketCall = function () {
      socketMsg = 'event emitted'
    }

    let writeMsg = ''
    let writeFile = function () {
      writeMsg = 'JSON file written'
    }

    addCallback(req, res, socketCall, writeFile)
    expect(res.statusCode).to.equal(200)
    expect(res.statusMsg).to.equal('Successfully added.')
    expect(socketMsg).to.equal('event emitted')
    expect(writeMsg).to.equal('JSON file written')
  })
})
