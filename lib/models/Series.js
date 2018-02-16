import mongoose from 'mongoose'

import { postSave } from '../controller/series'

let serieSchema = new mongoose.Schema({
  title: String,
  url: String,
  collectionsUrl: String,
  issuesUrl: String,
  publisher: String,
  collections: [mongoose.Schema.Types.ObjectId],
  issues: [mongoose.Schema.Types.ObjectId]
}, {collection: 'series'})

serieSchema.post('save', postSave)

export const Series = mongoose.model('Series', serieSchema)
