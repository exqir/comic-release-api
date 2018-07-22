const mongoose = require('mongoose')

let pullListSchema = new mongoose.Schema({
  owner: String,
  list: [mongoose.Schema.Types.ObjectId]
}, {collection: 'pulllists'})

export const PullList = mongoose.model('PullList', pullListSchema)
