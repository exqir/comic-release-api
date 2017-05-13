'use strict'

const Series = require('../../models/Series')

function getByTitleAndPublisher (title, publisher, callback) {
  Series.findOne({title: title})
  .where('publisher').equals(publisher)
  .exec(callback)
}

function create (series, callback) {
  new Series({
    title: series.title,
    url: series.url,
    collectionsUrl: series.collectionsUrl,
    issuesUrl: series.issuesUrl,
    publisher: series.publisher,
    collections: [],
    issues: []
  }).save(callback)
}

function getAllinList (list, callback) {
  Series.find()
  .where('_id')
  .in(list)
  .exec(callback)
}

module.exports = {
  getByTitleAndPublisher: getByTitleAndPublisher,
  create: create,
  getAllinList: getAllinList
}
