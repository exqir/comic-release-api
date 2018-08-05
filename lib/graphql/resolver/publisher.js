'use strict'
import { DependencyFactory } from '../../factories/dependencyFactory'

const { publisherService, seriesService } = DependencyFactory.getDependencies()

export const PublisherRoot = {
  publishers: async (root, { names }) => {
    if (names.length <= 0) return await publisherService.getPublishers()
    else return await publisherService.getPublishersInList(names)
  },
  publisher: async (root, { name }) => await publisherService.getPublisherByName(name),
}

export const PublisherResolver = {
  Publisher: {
    series: async ({ series }) => await seriesService.getSeriesInList(series),
  }
}
