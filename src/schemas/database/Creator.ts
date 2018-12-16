import { Schema, model } from 'mongoose'
import { CreatorModel } from '../../types/mongo';

export const Creator: CreatorModel = model('Creator', new Schema({
  fistname: String,
  lastname: String,
  comicBooks: [Schema.Types.ObjectId],
}, { collection: 'creators' }))
