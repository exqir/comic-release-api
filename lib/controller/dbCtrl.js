'use strict'

const util = require('../util')

const publisher = require('./db/publisher')
const Series = require('../models/Series')
const PullList = require('../models/PullList')

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

function createNewPullList (owner, callback) {
  new PullList({
    owner: owner,
    list: []
  }).save(callback)
}

function updatePullListForOwner (owner, series, callback) {
  PullList.findByIdAndUpdate(owner, {$push: {'list': series}},
    {new: true}, function (err, pullList) {
      callback(err, pullList)
    })
}

module.exports = {
  publisher: publisher,
  getSeries: getSeries,
  saveSeries: saveSeries,
  createNewPullList: createNewPullList,
  updatePullListForOwner: updatePullListForOwner
}
