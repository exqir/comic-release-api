'use strict'

const publisher = require('./db/publisher')
const series = require('./db/series')
const pullList = require('./db/pullList')

module.exports = {
  publisher: publisher,
  series: series,
  pullList: pullList
}
