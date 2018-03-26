'use strict'

import { getComic } from '../../adapter/comic'
import { getPublisher } from '../../adapter/publisher'
import { getSeries } from '../../adapter/series'

export const ComicRoot = {
  comic: async (root, { id }) => await getComic(id)
}

export const ComicResolver = {
  Comic: {
    publisher: async ({ publisher }) => await getPublisher(publisher),
    series: async ({ series }) => await getSeries(series),
  }
}
