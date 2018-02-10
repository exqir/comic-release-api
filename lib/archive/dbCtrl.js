'use strict'

const publisher = require('./db/publisher')
const series = require('./db/series')
const pullList = require('./db/pullList')
const issues = require('./db/issues')

module.exports = {
  publisher: publisher,
  series: series,
  pullList: pullList,
  issues: issues
}
