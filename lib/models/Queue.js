import mongoose from 'mongoose'

import { DependencyFactory } from '../factories/dependencyFactory'
import { handleJob } from '../controller/jobs'

let queueSchema = new mongoose.Schema({
  job: String,
  data: mongoose.Schema.Types.Mixed
}, {collection: 'queue'})

/**
 * CIRCULAR DEPENDENCIES!!!!
 * DepedenceyFactory imports QUEUE
 */
queueSchema.post('save', handleJob(DependencyFactory.getDependencies))

export const Queue = mongoose.model('Queue', queueSchema)
