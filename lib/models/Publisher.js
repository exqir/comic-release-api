import mongoose from 'mongoose'

const publisherSchema = new mongoose.Schema({
  _id: String,
  name: String,
  iconUrl: String,
  url: String,
  baseUrl: String,
  searchPath: String,
  searchSeriesPath: String,
  seriesPath: String,
  series: [mongoose.Schema.Types.ObjectId]
}, {collection: 'publishers'})

export const Publisher =  mongoose.model('Publisher', publisherSchema)
