const mongoose = require('mongoose')

let publisherSchema = new mongoose.Schema({
  name: String,
  displayName: String,
  iconUrl: String,
  url: String,
  baseUrl: String,
  searchPath: String,
  searchSeriesPath: String,
  seriesPath: String
}, {collection: 'publishers'})

let Publisher = mongoose.model('Publisher', publisherSchema)

module.exports = Publisher
