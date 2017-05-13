'use strict'

const mongoose = require('mongoose')
const Logger = require('./lib/Logger')
const app = require('./lib/app')

const dbServer = process.env.DB_SERVER || 'localhost'
const db = process.env.DB || 'test'
const port = process.env.PORT || 3000

function connectToDatabase (url, user, pass) {
  try {
    mongoose.connect('mongodb://' + url, {'user': user, 'pass': pass})
  } catch (e) {
    Logger.logError('connection to database failed: ' + e)
  }
}
// localhost/comic-app
connectToDatabase(dbServer + '/' + db)
app.db = mongoose
app.listen(port, function () {
  console.log('comic-release-api started \n listening on ' + port)
})

module.exports = app
