'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import schema from './graphql/schema'

const path = `/api/graphql/v1/`
const app = express()
app.all('*', function (req, res, next) {
  // Allow cross origin requests
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})
app.use(path, bodyParser.json(), graphqlExpress({ schema }));
app.get('/graphiql', graphiqlExpress({ endpointURL: path }));

function start (port, express = app) {
  express.listen(port, function () {
    console.log(`${new Date().toISOString()}: comic-release-api started
    at ${path}
    listening on ${port}`)
  })
}

module.exports = {
  start,
  express: app
}