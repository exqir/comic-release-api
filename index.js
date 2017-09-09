'use strict'

const dbClient = require('comic-mongo-client')
const app = require('./lib/app')

const dbServer = process.env.DB_SERVER || 'localhost'
const dbName = process.env.DB || 'test'
const port = process.env.PORT || 3000

// localhost/comic-app
dbClient.connect(dbServer + '/' + dbName)
app.db = dbClient.db
app.listen(port, function () {
  console.log('comic-release-api started \n listening on ' + port)
})

module.exports = app
