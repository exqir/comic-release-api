'use strict'
import { DependenciesFactory } from '../../factories/dependencyFactory'

const { comicService, publisherService, seriesService } = DependenciesFactory.getDependencies()

export const SeriesRoot = {
  series: async (root, { id }) => await seriesService.getSeriesById(id)
}

export const SeriesResolver = {
  Series: {
    issues: async ({ issues }) => await comicService.getComics(issues),
    collections: async ({ collections }) => await comicService.getComics(collections),
    publisher: async ({ publisher }) => await publisherService.getPublisherByName(publisher)
  }
}
