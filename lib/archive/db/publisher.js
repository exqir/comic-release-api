'use strict'

const Publisher = require('../../models/Publisher')

function getAll (callback) {
  Publisher.find()
  .exec(callback)
}

function getById (id, callback) {
  Publisher.findById(id)
  .exec(callback)
}

function getAllInNames (names, callback) {
  Publisher.find()
  .where('name')
  .in(names)
  .exec(callback)
}

module.exports = {
  getAll: getAll,
  getById: getById,
  getAllInNames: getAllInNames
}
