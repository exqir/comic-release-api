'use strict'

const express = require('express')
const router = require('./router')

let app = express()

app.all('*', function (req, res, next) {
    // Allow cross origin requests
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.use('/api/v1', router)

module.exports = app
