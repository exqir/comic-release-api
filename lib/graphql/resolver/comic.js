'use strict'
import { DependenciesFactory } from '../../factories/dependencyFactory'

const { comicService, publisherService, seriesService } = DependenciesFactory.getDependencies()

export const ComicRoot = {
  comic: async (root, { id }) => await comicService.getComicById(id)
}

export const ComicResolver = {
  Comic: {
    publisher: async ({ publisher }) => await publisherService.getPublisherByName(publisher),
    series: async ({ series }) => await seriesService.getSeriesById(series),
  }
}
