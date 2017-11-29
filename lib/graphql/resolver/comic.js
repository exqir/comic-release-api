'use strict'

import Publisher from '../../models/Publisher'

const ComicResolver = {
  Comic: {
    publisher: async ({ publisher }) => await Publisher.findById(publisher).exec(),
  }
}

module.exports = {
  ComicResolver,
}