'use strict'

const express = require('express')
const scrapCtrl = require('./controller/scrapCtrl')

let router = express.Router()

// usage /search/keyword?publisher=image&publisher=dc
router.route('/search/:keyword?')
.get(function (req, res) {
  let keyword = req.params.keyword
  let publisher = req.query.publisher
  scrapCtrl.search(keyword, publisher, function (err, results) {
    if (err) return res.status(500).send('An unexpected error occured')
    else {
      return res.status(200).json({results: results})
    }
  })
})

router.route('/scrap/:publisher([a-z]+)')
.get(function (req, res) {
  // scraper.scrap(req, res)
})
.post(function (req, res) {
})

module.exports = router
