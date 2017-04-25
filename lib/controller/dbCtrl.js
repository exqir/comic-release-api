'use strict'

const util = require('../util')

const Publisher = require('../models/Publisher')
const Series = require('../models/Series')
const PullList = require('../models/PullList')

function getAllPublishers (callback) {
  Publisher.find()
  .exec(callback)
}

function getPublisherById (id, callback) {
  Publisher.findById(id)
  .exec(callback)
}

function getPublishersForNames (names, callback) {
  Publisher.find()
  .where('name')
  .in(names)
  .exec(callback)
}

function getSeries (title, publisher, callback) {
  Series.find({title: title})
  .where('publisher').equals(publisher)
  .select('_id')
  .exec(callback)
}

function saveSeries (series, callback) {
  new Series(series).save(function (err) {
    util.handleErrorWithCb(err, callback)
  })
}

function updatePullListForOwner (owner, series, callback) {
  PullList.findByIdAndUpdate(owner, {$push: {'list': series}},
    {safe: true, upsert: true}, function (err, pullList) {
      callback(err, pullList)
    })
}

module.exports = {
  getAllPublishers: getAllPublishers,
  getPublisherById: getPublisherById,
  getPublishersForNames: getPublishersForNames,
  getSeries: getSeries,
  saveSeries: saveSeries,
  updatePullListForOwner: updatePullListForOwner
}
