'use strict'

const scraper = require('comic-scraper')

const scrapCtrl = require('./scrapCtrl')
const db = require('./dbCtrl')

function getSearch (req, res) {
  let keyword = req.params.keyword
  let publisher = req.query.publisher
  search(keyword, publisher, function (err, results) {
    if (err) return res.status(500).send('error: ' + err.message)
    else {
      return res.status(200).json({results: results})
    }
  })
}

function search (searchString, publisher, callback) {
  if (publisher === undefined || publisher === null) {
    db.getAllPublishers(function (err, results) {
      scrapCtrl.callScraper(err, scraper.searchResults, results, searchString, callback)
    })
  } else {
    if (!Array.isArray(publisher)) publisher = [].concat(publisher)
    db.getPublishersForNames(publisher, function (err, results) {
      scrapCtrl.callScraper(err, scraper.searchResults, results, searchString, callback)
    })
  }
}

module.exports = {
  getSearch: getSearch
}
