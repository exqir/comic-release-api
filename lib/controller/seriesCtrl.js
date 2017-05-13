'use strict'

const scraper = require('comic-scraper')

const request = require('request')
const db = require('./dbCtrl')
const job = require('./jobCtrl')
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
    db.series.create(result, function (err, res) {
      request('http://localhost:3000/api/v1/series/' + res.id + '/issues/update', function (err) {
        util.handleError(err, callback)
      })
      callback(err, res)
    })
  })
}

function update (req, res) {
  const id = req.params.id
  const cb = util.getCallback(res)
  db.series.getById(id, function (err, result) {
    util.handleError(err, cb)
    db.publisher.getById(result.publisher, function (err, publisher) {
      util.handleError(err, cb)
      cb(null, 'job started')
      job.initSeries(publisher, result)
    })
  })
}
module.exports = {
  createNewFromSearch: createNewFromSearch,
  update: update
}
