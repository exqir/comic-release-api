const mongoose = require('mongoose')

let serieSchema = new mongoose.Schema({
  title: String,
  url: String,
  collectionsUrl: String,
  issuesUrl: String,
  publisher: String,
  collections: [mongoose.Schema.Types.ObjectId],
  issues: [mongoose.Schema.Types.ObjectId]
}, {collection: 'series'})

let Serie = mongoose.model('Series', serieSchema)

module.exports = Serie
