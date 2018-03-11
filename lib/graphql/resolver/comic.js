'use strict'

import { getComic } from '../../controller/comic'
import { getPublisher } from '../../controller/publisher'
import { getSeries } from '../../controller/series'

export const ComicRoot = {
  comic: async (root, { id }) => await getComic(id)
}

export const ComicResolver = {
  Comic: {
    publisher: async ({ publisher }) => await getPublisher(publisher),
    series: async ({ series }) => await getSeries(series),
  }
}
