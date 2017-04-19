const mongoose = require('mongoose')

let pullListSchema = new mongoose.Schema({
  owner: String,
  list: [mongoose.Schema.Types.ObjectId]
}, {collection: 'pull-list'})

let PullList = mongoose.model('Comic', pullListSchema)

module.exports = PullList
