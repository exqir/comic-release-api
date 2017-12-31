'use strict'

import Publisher from '../../models/Publisher'
import Series from '../../models/Series'

const PublisherRoot = {
  publishers: async (root, { names }) => {
    if (names.length === 0) return await Publisher.find().exec()
    else return await Publisher.find().where('name').in(names).exec()
  },
  publisher: async (root, { name }) => await Publisher.findOne({name: name}).exec(),
}

const PublisherResolver = {
  Publisher: {
    series: async (publisher) => await Series.find({publisher: publisher._id}).exec(),
  }
}

module.exports = {
  PublisherRoot,
  PublisherResolver,
}
