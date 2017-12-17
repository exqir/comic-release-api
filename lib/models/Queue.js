const mongoose = require('mongoose')

let queueSchema = new mongoose.Schema({
  job: String,
  data: mongoose.Schema.Types.Mixed
}, {collection: 'queue'})

let Queue = mongoose.model('Queue', queueSchema)

module.exports = Queue