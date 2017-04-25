'use strict'

const express = require('express')
const search = require('./controller/searchCtrl')
const pullList = require('./controller/pullListCtrl')

let router = express.Router()

// usage /search/keyword?publisher=image&publisher=dc
router.route('/search/:keyword?')
.get(function (req, res) {
  search.getSearch(req, res)
})

router.route('/pulllist/:owner/:series')
.get(function (req, res) {
  pullList.getPullList(req, res)
})
.post(function (req, res) {
  pullList.postPullList(req, res)
})

router.route('/scrap/:publisher([a-z]+)')
.get(function (req, res) {
  // scraper.scrap(req, res)
})
.post(function (req, res) {
})

module.exports = router
