'use strict'

function logError (msg) {
  console.error(dateWithMsg(msg))
}

function logMsg (msg) {
  console.log(dateWithMsg(msg))
}

function dateWithMsg (msg) {
  const date = new Date().toString()
  return `${date}: ${msg}`
}

module.exports = {
  logError,
  logMsg,
}
