const express = require('express')
const multer = require('multer')
const imageFile = require('./image')
//let upload = multer({ dest: 'uploads/' })

let app = express();
let port = process.env.PORT || 3000

let storage = multer.memoryStorage()
let upload = multer({dest: 'uploads/', storage })

app.listen(port, function() {
	console.log('Your server is running! ' + 3000)
})

app.post('/uploadFile', upload.any('file'), function(req, res, next){
  let buffer = req.files[0].buffer
  console.log('buffer is ', buffer)
  let imgjpg = imageFile.makeImage(buffer)
  res.send(imgjpg)
})

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html')
})

module.exports = app
