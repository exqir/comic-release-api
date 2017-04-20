'use strict'

const util = require('../util')

// function callScraper (err, arg1, arg2, f, cb) {
//   util.handleError(err, 'error', cb)
//   f(arg1, arg2, cb)
// }

function callScraper (err, f) {
  let args = Array.prototype.slice.call(arguments, 2)
  util.handleError(err, 'error', args[args.length - 1])
  f.apply(null, args)
}

module.exports = {
  callScraper: callScraper
}
