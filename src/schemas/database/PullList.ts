import { Schema, model } from 'mongoose'
import { PullListModel } from '../../types/mongo'

export const PullList: PullListModel = model(
  'PullList',
  new Schema(
    {
      owner: Schema.Types.ObjectId,
      list: [Schema.Types.ObjectId],
    },
    { collection: 'pullLists' },
  ),
)
