'use strict'
const Logger = require('./Logger')
const dateformat = require('dateformat')

function getCallback (res) {
  return function callback (err, content) {
    sendResponse(err, res, content)
  }
}

function sendResponse (err, res, content) {
  if (err || content === null) {
    Logger.logError('error: ' + err.message)
    return res.status(500).send({error: err.message})
  } else return res.status(200).json({result: content})
}

function handleError (err, callback) {
  if (err) return callback(err)
}

function infuseCallback(res, fn) {
  return function callback (err, result) {
    fn(result).bind(res)
  }
}

function getISODate (date) {
  return dateformat(date, 'isoDate')
}

module.exports = {
  getCallback: getCallback,
  sendResponse: sendResponse,
  handleError: handleError,
  getISODate: getISODate
}
