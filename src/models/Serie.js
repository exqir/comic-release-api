var mongoose = require("mongoose");

var serieSchema = new mongoose.Schema({
  title: {  type: String },
  author: Schema.Types.ObjectId,
  artist: Schema.Types.ObjectId,
  publisher: Schema.Types.ObjectId,
  url: String,
  subsribed: Boolean
});

var Serie = mongoose.model('Serie', serieSchema);

module.exports = {
  Serie: Serie
};
