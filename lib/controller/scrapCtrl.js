'use strict'

const util = require('../util')

function callFnWithErrorHandling (err, fn) {
  let args = Array.prototype.slice.call(arguments, 2)
  util.handleError(err, 'error', args[args.length - 1])
  fn.apply(null, args)
}

function handleResult (err, res, results) {
  if (err) return res.status(500).send('error: ' + err.message)
  else {
    return res.status(200).json({results: results})
  }
}

module.exports = {
  callFnWithErrorHandling: callFnWithErrorHandling,
  handleResult: handleResult
}
