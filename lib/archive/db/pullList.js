'use strict'

const PullList = require('../../models/PullList')

function create (owner, callback) {
  getByOwner(owner, function (err, pullList) {
    if (err) return callback(err)
    if (pullList) return callback(null, pullList)
    new PullList({
      owner: owner,
      list: []
    }).save(callback)
  })
}

function getById (id, callback) {
  PullList.findById(id)
  .exec(callback)
}

function getByOwner (owner, callback) {
  PullList.findOne({owner: owner})
  .exec(callback)
}

function addSeriesForOwner (owner, series, callback) {
  PullList.findOneAndUpdate({owner: owner}, {$push: {list: series}}, {new: true}, function (err, pullList) {
    callback(err, pullList)
  })
  // PullList.findByIdAndUpdate(owner, {$push: {'list': series}},
  //   {new: true}, function (err, pullList) {
  //     callback(err, pullList)
  //   })
}

module.exports = {
  create: create,
  getById: getById,
  getByOwner: getByOwner,
  addSeriesForOwner: addSeriesForOwner
}
