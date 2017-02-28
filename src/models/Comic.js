var mongoose = require("mongoose");

var comicSchema = new mongoose.Schema({
  title: String,
  issue: String,
  release_date: Date,
  author: Schema.Types.ObjectId,
  artist: Schema.Types.ObjectId,
  serie: Schema.Types.ObjectId,
  publisher: Schema.Types.ObjectId,
  imageUrl: String,
  url: String
});

var Comic = mongoose.model('Comic', comicSchema);

module.exports = {
  Comic: Comic
};
