import { Schema, model } from 'mongoose'

export const PullList = model('PullList', new Schema({
  owner: Schema.Types.ObjectId,
  list: [Schema.Types.ObjectId]
}, { collection: 'pullLists' }))
