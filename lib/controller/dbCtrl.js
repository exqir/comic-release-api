'use strict'

const Publisher = require('../models/Publisher')

function getAllPublishers (callback) {
  Publisher.find()
  .exec(callback)
}

function getPublishersForNames (names, callback) {
  Publisher.find()
  .where('name')
  .in(names)
  .exec(callback)
}

module.exports = {
  getAllPublishers: getAllPublishers,
  getPublishersForNames: getPublishersForNames
}
