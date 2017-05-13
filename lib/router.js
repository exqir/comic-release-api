'use strict'

const express = require('express')
const search = require('./controller/searchCtrl')
const pullList = require('./controller/pullListCtrl')

let router = express.Router()

// usage /search/keyword?publisher=image&publisher=dc
router.route('/search/:keyword?')
.get(search.get)

router.route('/pullList')
.post(pullList.create)

router.route('/pullList/:owner')
.get(pullList.getForOwner)

router.route('/pullList/:owner/series')
.post(pullList.addSeries)

router.route('/scrap/:publisher([a-z]+)')
.get(function (req, res) {
  // scraper.scrap(req, res)
})
.post(function (req, res) {
})

module.exports = router
