'use strict'

import { getAllPublishers, getPublisher, getPublishersIn } from  '../../controller/publisher'
import { getSeriesIn } from '../../controller/series'

export const PublisherRoot = {
  publishers: async (root, { names }) => {
    if (names.length <= 0) return await getAllPublishers()
    else return await getPublishersIn(names)
  },
  publisher: async (root, { name }) => await getPublisher(name),
}

export const PublisherResolver = {
  Publisher: {
    series: async ({ series }) => await getSeriesIn(series),
  }
}
