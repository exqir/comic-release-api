const mongoose = require('mongoose')

let comicSchema = new mongoose.Schema({
  title: String,
  releaseDate: Date,
  creators: [mongoose.Schema.Types.ObjectId],
  series: mongoose.Schema.Types.ObjectId,
  publisher: mongoose.Schema.Types.ObjectId,
  imageUrl: String,
  imageColor: String,
  url: String
}, {collection: 'comics'})

let Comic = mongoose.model('Comic', comicSchema)

module.exports = Comic
