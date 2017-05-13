const mongoose = require('mongoose')

let pullListSchema = new mongoose.Schema({
  owner: String,
  list: [mongoose.Schema.Types.ObjectId]
}, {collection: 'pulllist'})

let PullList = mongoose.model('PullList', pullListSchema)

module.exports = PullList
