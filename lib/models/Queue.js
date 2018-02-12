import mongoose from 'mongoose'

import logger from '../Logger'
import { chooseJob } from '../controller/jobs'

let queueSchema = new mongoose.Schema({
  job: String,
  data: mongoose.Schema.Types.Mixed
}, {collection: 'queue'})

queueSchema.post('save', chooseJob)

export const Queue = mongoose.model('Queue', queueSchema)
