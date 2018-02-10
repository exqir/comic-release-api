import mongoose from 'mongoose'

const publisherSchema = new mongoose.Schema({
  _id: String,
  name: String,
  iconUrl: String,
  url: String,
  baseUrl: String,
  searchPath: String,
  searchSeriesPath: String,
  seriesPath: String
}, {collection: 'publishers'})

export default mongoose.model('Publisher', publisherSchema)
