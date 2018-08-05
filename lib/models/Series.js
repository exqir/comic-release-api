import mongoose from 'mongoose'

import { PublisherService } from '../services/publisherService'
import { QueueService } from '../services/queueService'
import { postSave } from '../controller/series'

const serieSchema = new mongoose.Schema({
  title: String,
  url: String,
  collectionsUrl: String,
  issuesUrl: String,
  publisher: { type: String, ref: 'Publisher'},
  collections: [mongoose.Schema.Types.ObjectId],
  issues: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comic'}]
}, {collection: 'series'})

/**
 * CIRCULAR DEPENDENCIES!!!!
 * DepedenceyFactory import SERIES
 * workaround, only import needed dependencies manually :(
 */
serieSchema.post('save', postSave({ publisherService: PublisherService, queueService: QueueService }))

export const Series = mongoose.model('Series', serieSchema)
