'use strict'
const Logger = require('./Logger')
const dateformat = require('dateformat')

function handleRequestResponse (err, res, callback) {
  handleError(err, 'error reaching publisher', callback)
  if (res.statusCode !== 200) {
    Logger.logError('error: publisher responded with ' + res.statusCode)
    callback(new Error('publisher responded with ' + res.statusCode))
  }
}

function handleError (err, res) {
  if (err) {
    Logger.logError('error:' + err.message + ' : ' + err)
    return res.status(500).send('error: ' + err.message)
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
  handleRequestResponse: handleRequestResponse,
  handleError: handleError,
  handleErrorWithCb: handleErrorWithCb,
  getISODate: getISODate
}
