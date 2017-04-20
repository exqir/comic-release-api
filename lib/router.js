'use strict'

const express = require('express')
const search = require('./controller/searchCtrl')

let router = express.Router()

// usage /search/keyword?publisher=image&publisher=dc
router.route('/search/:keyword?')
.get(function (req, res) {
  search.getSearch(req, res)
})

router.route('/scrap/:publisher([a-z]+)')
.get(function (req, res) {
  // scraper.scrap(req, res)
})
.post(function (req, res) {
})

module.exports = router
