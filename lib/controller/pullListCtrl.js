'use strict'

const scraper = require('comic-scraper')

const db = require('./dbCtrl')
const seriesCtrl = require('./seriesCtrl')
const util = require('../util')

function createPullList (req, res) {
  const owner = req.body.owner
  const cb = util.getCallback(res)
  db.pullList.create(owner, cb)
}

function getForOwner (req, res) {
  const owner = req.params.owner
  const cb = util.getCallback(res)
  db.pullList.getByOwner(owner, cb)
}

function addSeries (req, res) {
  const owner = req.params.owner
  const series = req.body.series

  const cb = util.getCallback(res)

  db.series.getByTitleAndPublisher(series.title, series.publisher,
    function (err, result) {
      util.handleError(err, cb)
      addExistingSeriesOrCreateNew(owner, result || series, cb)
    })
}

function addExistingSeriesOrCreateNew (owner, series, callback) {
  if (series.id === null || series.id === undefined) {
    seriesCtrl.createNewFromSearch(series, function (err, result) {
      util.handleError(err, callback)
      db.pullList.addSeriesForOwner(owner, result.id, callback)
    })
  } else db.pullList.addSeriesForOwner(owner, series.id, callback)
}

function getAllSeries (req, res) {
  const owner = req.params.owner
  const cb = util.getCallback(res)

  db.pullList.getByOwner(owner, function (err, result) {
    util.handleError(err, cb)
    db.series.getAllinList(result.list, cb)
  })
}

module.exports = {
  create: createPullList,
  getForOwner: getForOwner,
  addSeries: addSeries,
  getAllSeries: getAllSeries
}
