var mongoose = require('mongoose')

var creatorSchema = new mongoose.Schema({
  name: String,
  surename: String
}, {collection: 'creators'})

var Creator = mongoose.model('Creator', creatorSchema)

module.exports = Creator
