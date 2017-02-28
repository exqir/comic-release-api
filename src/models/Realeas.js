var mongoose = require("mongoose");

var comicSchema = new mongoose.Schema({
  comic: Schema.Types.ObjectId
});

var Comic = mongoose.model('Comic', comicSchema);

module.exports = {
  Comic: Comic
};
