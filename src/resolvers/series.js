'use strict'
import { DependencyFactory } from '../../factories/dependencyFactory'

const { comicService, publisherService, seriesService } = DependencyFactory.getDependencies()

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
