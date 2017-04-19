'use strict'

const mongoose = require('mongoose')
const Publisher = require('../models/Publisher')

function getPublishersForNames (names, callback) {
  Publisher.find()
  .where('name')
  .in(names)
  .exec(callback)
}

module.exports = {
  getPublishersForNames: getPublishersForNames
}
