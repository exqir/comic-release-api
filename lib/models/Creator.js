var mongoose = require("mongoose");

var creatorSchema = new mongoose.Schema({
  name: String,
  surename: String,
  release_date: Date
});

var Creator = mongoose.model('Creator', creatorSchema);

module.exports = {
  Creator: Creator
};
