import {app} from '../server'

// The update channel aka the home page
app.get('/', function (req, res) {
    res.sendFile(path.resolve('views/index.html'))
})