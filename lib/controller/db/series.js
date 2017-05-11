'use strict'

const Series = require('../../models/Series')

const util = require('../../util')

function getSeries (title, publisher, callback) {
  Series.find({title: title})
  .where('publisher').equals(publisher)
  .select('_id')
  .exec(callback)
}

function saveSeries (series, callback) {
  new Series(series).save(function (err) {
    util.handleErrorWithCb(err, callback)
  })
}

module.exports = {
  getSeries: getSeries,
  saveSeries: saveSeries
}
