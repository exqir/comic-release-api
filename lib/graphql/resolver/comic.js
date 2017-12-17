'use strict'

import Comic from '../../models/Comic'
import Publisher from '../../models/Publisher'

const ComicRoot = {
  comic: async (root, { id }) => await Comic.findById(id).exec()
}

const ComicResolver = {
  Comic: {
    publisher: async ({ publisher }) => await Publisher.findById(publisher).exec(),
  }
}

module.exports = {
  ComicRoot,
  ComicResolver,
}