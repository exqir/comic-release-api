import { Schema, model } from 'mongoose';
import { ComicBookModel } from '../../types/mongo';

export const ComicBook: ComicBookModel = model('ComicBook', new Schema({
  title: String,
  issue: String,
  releaseDate: Date,
  creators: [Schema.Types.ObjectId],
  series: Schema.Types.ObjectId,
  publisher: Schema.Types.ObjectId,
  coverUrl: String,
  url: String,
}, { collection: 'comicBooks' }))
