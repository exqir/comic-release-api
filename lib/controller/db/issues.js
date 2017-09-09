'use strict'

const Issues = require('../../models/Comic')

function createMany (issues, callback) {
  Issues.insertMany(issues, callback)
}

function create (issue, callback) {
  new Issues({
    title: issue.title,
    releaseDate: issue.releaseDate,
    creators: issue.creators,
    series: issue.series,
    publisher: issue.publisher,
    imageUrl: issue.imageUrl,
    imageColor: '#000',
    url: issue.url
  }).save(callback)
}

function editOne (issue, callback) {
  Issues.findOneAndUpdate({_id: issue.id}, issue, {new: true}, callback)
}

function getAllInSeries (series, callback) {
  Issues.find({series: series}, callback)
}

module.exports = {
  createMany: createMany,
  create: create,
  editOne: editOne,
  getAllInSeries: getAllInSeries
}
