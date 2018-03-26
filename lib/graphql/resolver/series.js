'use strict'

import { getPublisher } from '../../adapter/publisher'
import { getComics } from '../../adapter/comic'
import { getSeries, addSeries } from '../../adapter/series'

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
