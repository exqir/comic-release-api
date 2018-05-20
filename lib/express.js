'use strict'

import express from 'express'
import bodyParser from 'body-parser'
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express'

import schema from './graphql/schema'
import { setupPassportStrategy, configureExpressForPassport } from './auth'

setupPassportStrategy()

const path = `/api/graphql/v1/`
const app = express()

// CORS
app.all('*', function (req, res, next) {
  // Allow cross origin requests
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})
app.use(path, function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});
app.use(bodyParser.urlencoded({ extended: true }))

// AUTHENTICATION
configureExpressForPassport(app)

app.use(path, bodyParser.json(), graphqlExpress(req => {
  return {
    schema,
    context: {
      req,
    },
  }
}))

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