const mongoose = require('mongoose')

let comicSchema = new mongoose.Schema({
  title: String,
  issue: String,
  releaseDate: Date,
  creators: [mongoose.Schema.Types.Mixed],
  series: mongoose.Schema.Types.ObjectId,
  publisher: String,
  imageUrl: String,
  url: String
}, {collection: 'comics'})

let Comic = mongoose.model('Comic', comicSchema)

module.exports = Comic

// @TODO use creators