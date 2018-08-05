'use strict'
import { DependencyFactory } from '../../factories/dependencyFactory'

const { comicService, publisherService, seriesService } = DependencyFactory.getDependencies()

export const ComicRoot = {
  comic: async (root, { id }) => await comicService.getComicById(id)
}

export const ComicResolver = {
  Comic: {
    publisher: async ({ publisher }) => await publisherService.getPublisherByName(publisher),
    series: async ({ series }) => await seriesService.getSeriesById(series),
  }
}
