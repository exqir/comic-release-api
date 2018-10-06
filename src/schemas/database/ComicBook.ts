import { Schema, model } from 'mongoose';

export const ComicBook = model('ComicBook', new Schema({
  title: String,
  issue: String,
  releaseDate: Date,
  creators: [Schema.Types.ObjectId],
  series: Schema.Types.ObjectId,
  publisher: Schema.Types.ObjectId,
  coverUrl: String,
  url: String,
}, { collection: 'comicBooks' }))
