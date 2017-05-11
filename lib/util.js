'use strict'
const Logger = require('./Logger')
const dateformat = require('dateformat')

function handleError (err, res) {
  if (err) {
    Logger.logError('error:' + err.message + ' : ' + err)
    return res.status(500).send('error: ' + err.message)
  }
}

function getCallback (res) {
  return function callback (err, content) {
    sendResponse(err, res, content)
  }
}

function sendResponse (err, res, content) {
  if (err || content === null) return res.status(500).send({error: err.message})
  else if (content === false) return
  else {
    return res.status(200).json({result: content})
  }
}

function handleErrorWithCb (err, callback) {
  if (err) {
    Logger.logError('error:' + err.message + ' : ' + err)
    return callback(err)
  }
}

function getISODate (date) {
  return dateformat(date, 'isoDate')
}

module.exports = {
  handleError: handleError,
  getCallback: getCallback,
  sendResponse: sendResponse,
  handleErrorWithCb: handleErrorWithCb,
  getISODate: getISODate
}
