var mongoose = require("mongoose");

var comicSchema = new mongoose.Schema({
  title: String,
  issue: String,
  release_date: Date,
  author: mongoose.Schema.Types.ObjectId,
  artist: mongoose.Schema.Types.ObjectId,
  serie: mongoose.Schema.Types.ObjectId,
  publisher: mongoose.Schema.Types.ObjectId,
  imageUrl: String,
  imageColor: String,
  url: String
}, {collection: 'comics'});

var Comic = mongoose.model('Comic', comicSchema);

module.exports = {
  Comic: Comic
};
