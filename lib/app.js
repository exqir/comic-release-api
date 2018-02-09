'use strict'

const express = require('./express')
const mongo = require('./mongo')

const dbServer = process.env.DB_SERVER || 'localhost'
const dbName = process.env.DB || 'test'
const port = process.env.PORT || 3000

export const start = async () => {
  const db = await mongo.connect(dbServer + '/' + dbName)
  const server = express.start(port)
  return server
}