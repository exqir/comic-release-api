import { Schema, model } from 'mongoose'
import { PublisherModel } from '../../types/mongo';

export const Publisher: PublisherModel = model('Publisher', new Schema({
  _id: String,
  name: String,
  iconUrl: String,
  url: String,
  // @TODO: check which of the four paths are really needed
  basePath: String,
  seriesPath: String,
  searchPath: String,
  searchPathSeries: String,
  series: [Schema.Types.ObjectId],
}, { collection: 'publishers' }))
