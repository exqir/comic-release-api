var mongoose = require("mongoose");

var publisherSchema = new mongoose.Schema({
  name: String
});

var Creator = mongoose.model('Publisher', publisherSchema);

module.exports = {
  Publisher: Publisher
};
