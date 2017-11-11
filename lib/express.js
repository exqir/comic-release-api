'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import router from './router'
import schema from './graphql/schema'

const app = express()
app.all('*', function (req, res, next) {
  // Allow cross origin requests
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})
app.use('/graphql', bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

//app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())

function start (port, express = app) {
  express.listen(port, function () {
    console.log('comic-release-api started \n listening on ' + port)
  })
}

module.exports = { start }