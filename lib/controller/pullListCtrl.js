'use strict'

const scraper = require('comic-scraper')

const util = require('util')
const scrapCtrl = require('./scrapCtrl')
const db = require('./dbCtrl')

function createPullList (req, res) {
  const owner = req.body.owner
  db.createNewPullList(owner, function (err, result) {
    util.sendResponse(err, res, result)
  })
}

function getPullList (req, res) {
  const owner = req.params.owner
  db.findPullList(owner, function (err, result) {
    util.sendResponse(err, res, result)
  })
}

function postPullList (req, res) {
  const owner = req.params.owner
  const seriesObject = req.body.series
//  const title = req.params.series
  findSeries(seriesObject.title, seriesObject.publisher, function (err, series) {
    util.handleError(err, res)
    if (series) {
      util.handleError(err, res)
      addSeriesToPullList(owner, series._id, function (err, response) {
        scrapCtrl.handleResult(err, res, response)
      })
    }
    saveSeries(seriesObject, function (err, result) {
      util.handleError(err, res)
      addSeriesToPullList(owner, result._id, function (err, response) {
        scrapCtrl.handleResult(err, res, response)
      })
    })
  })
}

function findSeries (title, publisher, callback) {
  db.getSeries(title, function (err, series) {
    util.handleErrorWithCb(err, callback)
    callback(null, series)
  })
}

function saveSeries (series, callback) {
  db.getPublisherById(series.publisher, function (err, publisher) {
    util.handleErrorWithCb(err, callback)
    if (!publisher) return util.handleError(new Error('publisher not found in database'))
    scraper.series(publisher, series.url, function (err, enhancedSeries) {
      util.handleErrorWithCb(err, callback)
      enhancedSeries.publisher = series.publisher
      enhancedSeries.collections = []
      enhancedSeries.issues = []
      db.saveSeries(enhancedSeries, callback)
    })
  })
}

function addSeriesToPullList (owner, series, callback) {
  // TODO check if series is already in list
  db.updatePullListForOwner(owner, series, callback)
}

module.exports = {
  createPullList: createPullList,
  getPullList: getPullList,
  postPullList: postPullList
}
