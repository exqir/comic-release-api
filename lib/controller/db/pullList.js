'use strict'

const PullList = require('../../models/PullList')

function create (owner, callback) {
  new PullList({
    owner: owner,
    list: []
  }).save(callback)
}

function getById (id, callback) {
  PullList.findById(id)
  .exec(callback)
}

function getByOwner (owner, callback) {
  PullList.find({owner: owner})
  .exec(callback)
}

function updateForOwner (owner, series, callback) {
  PullList.findByIdAndUpdate(owner, {$push: {'list': series}},
    {new: true}, function (err, pullList) {
      callback(err, pullList)
    })
}

module.exports = {
  create: create,
  getById: getById,
  getByOwner: getByOwner,
  updateForOwner: updateForOwner
}
