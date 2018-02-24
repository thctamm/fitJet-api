const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const config = require('./models/config')
const routes = require('./routes/routes')

// http://mongoosejs.com/docs/promises.html
mongoose.Promise = global.Promise
mongoose.connect(config.dbUrl, {server: {socketOptions: {keepAlive: 120}}})

const app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false, limit: '1gb' }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', '*')
  res.header('Access-Control-Allow-Methods', '*')
  next()
})
app.use('/', routes)

// handle 404
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})


// development error handler
if (app.get('env') === 'development')
  app.use(function(err, req, res, next) {
    console.log(err)
    res.status(err.status || 500).send()
  })

// production error handler
app.use(function(err, req, res, next) {
  res.status(err.status || 500).send()
})

var server = app.listen(config.port)
console.log('Listening at http://localhost:%s in %s mode',
  server.address().port, app.get('env'))

module.exports = app
