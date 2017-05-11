'use strict'

const scraper = require('comic-scraper')

const db = require('./dbCtrl')
const util = require('../util')

function get (req, res) {
  const keyword = req.params.keyword
  const publisher = req.query.publisher

  const cb = util.getCallback(res)

  if (publisher === undefined || publisher === null) {
    getSearchResultForAllPublishers(keyword, cb)
  } else {
    getSearchResultForPublishers(publisher, keyword, cb)
  }
}

function getSearchResultForAllPublishers (keyword, cb) {
  db.publisher.getAll(function (err, result) {
    cb(err, false)
    scraper.searchResults(result, keyword, cb)
  })
}

function getSearchResultForPublishers (publisher, keyword, cb) {
  db.publisher.getAllInNames(publisher, function (err, result) {
    cb(err, false)
    scraper.searchResults(result, keyword, cb)
  })
}

module.exports = {
  get: get
}
