const mongoose = require('mongoose')
import logger from '../Logger'
import chooseJob from '../functions/jobs'

let queueSchema = new mongoose.Schema({
  job: String,
  data: mongoose.Schema.Types.Mixed
}, {collection: 'queue'})

queueSchema.post('save', chooseJob)

let Queue = mongoose.model('Queue', queueSchema)

module.exports = Queue