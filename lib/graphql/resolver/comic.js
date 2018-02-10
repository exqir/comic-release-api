'use strict'

import { getComic } from '../../controller/comic'
import { getPublisher } from '../../controller/publisher'

export const ComicRoot = {
  comic: async (root, { id }) => await getComic(id)
}

export const ComicResolver = {
  Comic: {
    publisher: async ({ publisher }) => await getPublisher(publisher),
  }
}
