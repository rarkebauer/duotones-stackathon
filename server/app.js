const express = require('express')
const multer = require('multer')
const imageFile = require('./image')
const path = require('path')
const volleyball = require("volleyball")
const bodyParser = require("body-parser")

//let upload = multer({ dest: 'uploads/' })

let app = express();
let port = process.env.PORT || 3000

// logging and body-parsing
app.use(volleyball);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

let storage = multer.memoryStorage()
let upload = multer({dest: 'uploads/', storage })

// static file-serving middleware
app.use(express.static(path.join(__dirname, "..", "public")))

app.get('/api/hello', (req, res, next) => {
  res.json({hello: 'hello from the backend!'})
})

app.post('/uploadFile', upload.single('file'), function(req, res, next){
  let buffer = req.file.buffer
  let imgjpg = imageFile.makeImage(buffer)
  res.send(imgjpg)
})

// app.get('/', function(req, res) {
// 	res.sendFile(__dirname + '/index.html')
// })
// failed to catch req above means 404, forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
})

// handle any errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send(err.message);
})

app.listen(port, function() {
	console.log('Your server is running! ' + 3000)
})

module.exports = app
