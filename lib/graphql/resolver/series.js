'use strict'

import { scrap } from '../../scraper/scraper'
import { getPublisher } from '../../controller/publisher'
import { getComics } from '../../controller/comic'
import { getSeries, addSeries } from '../../controller/series'
import { addToQueue } from '../../controller/queue'

export const SeriesRoot = {
  series: async (root, { id }) => await getSeries(id)
}

export const SeriesResolver = {
  Series: {
    issues: async ({ issues }) => await getComics(issues),
  }
}
