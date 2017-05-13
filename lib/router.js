'use strict'

const express = require('express')
const search = require('./controller/searchCtrl')
const pullList = require('./controller/pullListCtrl')
const series = require('./controller/seriesCtrl')

let router = express.Router()

// usage /search/keyword?publisher=image&publisher=dc
router.route('/search/:keyword?')
.get(search.get)

router.route('/pullList')
.post(pullList.create)

router.route('/pullList/:owner')
.get(pullList.getForOwner)

router.route('/pullList/:owner/series')
.get(pullList.getAllSeries)
.post(pullList.addSeries)

router.route('/pullList/:owner/series/:series')
// .get(series.get)
// .delete(pullList.removeSeries)

router.route('/series/:id')
// .get(series.get)
// .put(series.edit)
// .delete(series.delete)

router.route('/series/:id/issues')
// .get(series.getIssues)

router.route('/series/:id/collections')
// .get(series.getCollections)

router.route('/scrap/:publisher([a-z]+)')
.get(function (req, res) {
  // scraper.scrap(req, res)
})
.post(function (req, res) {
})

module.exports = router
