'use strict'

const scraper = require('comic-scraper')

const db = require('./dbCtrl')
const util = require('../util')

function createNewFromSearch (series, callback) {
  db.publisher.getById(series.publisher, function (err, publisher) {
    util.handleError(err, callback)
    createScrappedSeries(publisher, series.url, callback)
  })
}

function createScrappedSeries (publisher, seriesUrl, callback) {
  scraper.series(publisher, seriesUrl, function (err, result) {
    util.handleError(err, callback)
    result.publisher = publisher.id
    db.series.create(result, callback)
  })
}
module.exports = {
  createNewFromSearch: createNewFromSearch
}
