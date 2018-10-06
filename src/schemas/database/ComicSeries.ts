import { Schema, model } from 'mongoose'

const schema = new Schema({
  title: String,
  url: String,
  collectionsUrl: String,
  singleIssuesUrl: String,
  publisher: { type: String, ref: 'Publisher'},
  collections: [Schema.Types.ObjectId],
  comicBooks: [{ type: Schema.Types.ObjectId, ref: 'ComicBook' }]
}, { collection: 'comciSeries' })

// @TODO: check for alternatives to mongo hooks,
// maybe EventEmitter or some kind of schedular
schema.post('save', function (err: Error, comicSeries: object): void { return null })

export const ComicSeries = model('ComicSeries', schema)
