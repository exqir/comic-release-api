'use strict'

function logError (msg) {
  console.error(dateWithMsg(msg))
}

function logMsg (msg) {
  console.log(dateWithMsg(msg))
}

function dateWithMsg (msg) {
  return new Date().toString() + ': ' + msg
}

module.exports = {
  logError: logError,
  logMsg: logMsg
}
