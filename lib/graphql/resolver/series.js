'use strict'

import { getPublisher } from '../../controller/publisher'
import { getComics } from '../../controller/comic'
import { getSeries, addSeries } from '../../controller/series'

export const SeriesRoot = {
  series: async (root, { id }) => await getSeries(id)
}

export const SeriesResolver = {
  Series: {
    issues: async ({ issues }) => await getComics(issues),
    collections: async ({ collections }) => await getComics(collections),
    publisher: async ({ publisher }) => await getPublisher(publisher)
  }
}
