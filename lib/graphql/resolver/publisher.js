'use strict'
import { DependenciesFactory } from '../../factories/dependencyFactory'

const { publisherService, seriesService } = DependenciesFactory.getDependencies()

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
