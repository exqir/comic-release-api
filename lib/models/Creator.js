var mongoose = require('mongoose')

var creatorSchema = new mongoose.Schema({
  name: String,
  surename: String
}, {collection: 'creators'})

export const Creator = mongoose.model('Creator', creatorSchema)
