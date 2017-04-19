'use strict'

const mongoose = require('mongoose')
const Logger = require('./lib/Logger')
const app = require('./lib/app')
const port = process.env.PORT || 3000

function connectToDatabase (url, user, pass) {
  try {
    mongoose.connect('mongodb://' + url, {'user': user, 'pass': pass})
  } catch (e) {
    Logger.logError('connection to database failed: ' + e)
  }
}

 connectToDatabase('localhost/comic-app')

app.listen(port, function () {
  console.log('comic-release-api started \n listening on ' + port)
})
