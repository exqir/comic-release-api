'use strict'
const mongoose = require('mongoose')
const scraper = require('comic-scraper')

const db = require('./dbCtrl')

function search (searchString, publisher, callback) {
  let publisherDB
  if (publisher === undefined || publisher === null) {
    publisherDB = {
      '_id': mongoose.Types.ObjectId('58e7ec1289b1c148f22d2220'),
      'name': 'image',
      'iconUrl': 'https://imagecomics.com/assets/img/header-logo.png',
      'url': 'https://imagecomics.com',
      'displayName': 'Image Comics',
      'baseUrl': 'https://imagecomics.com',
      'searchPath': '/search/results?keywords=',
      'searchSeriesPath': '/search/series?keywords=',
      'seriesPath': '/comcis/series/'
    }
  } else {
    publisher = [].concat(publisher)
    db.getPublishersForNames(publisher, function (err, results) {
      if (err) return callback(err)
      else {
        scraper.searchResults(results, searchString, callback)
      }
    })
  }
}

module.exports = {
  search: search
}
