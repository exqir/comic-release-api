'use strict'

import Publisher from '../../models/Publisher'
import Series from '../../models/Series'

export const PublisherRoot = {
  publishers: async (root, { names }) => {
    if (names.length <= 0) return await Publisher.find().exec()
    else return await getPublishersIn(names)
  },
  publisher: async (root, { name }) => await getPublisher(name),
}

export const PublisherResolver = {
  Publisher: {
    series: async (publisher) => await Series.find({publisher: publisher._id}).exec(),
  }
}

export async function getPublisher(name) {
  return await Publisher.findById(name).exec()
}

export async function getPublishersIn(names) {
  return await Publisher.find().where('_id').in(names).exec()
}
