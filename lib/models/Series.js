import mongoose from 'mongoose'

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

serieSchema.post('save', postSave)

export const Series = mongoose.model('Series', serieSchema)
