import { Schema, model } from 'mongoose'

export const Creator = model('Creator', new Schema({
  fistname: String,
  lastname: String,
  comicBooks: [Schema.Types.ObjectId],
}, { collection: 'creators' }))
