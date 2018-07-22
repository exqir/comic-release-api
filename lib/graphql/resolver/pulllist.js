'use strict'
import { DependenciesFactory } from '../../factories/dependencyFactory'
import { createNewSeries } from '../../controller/series'

const { pullListService, seriesService} = DependenciesFactory.getDependencies()

export const PullListRoot = {
  pulllists: async (root, data) => await pullListService.getPullLists(),
  pulllist: async (root, { owner }) => await pullListService.getPullListByOwner(owner),
}

export const PullListResolver = {
  PullList: {
    list: async ({list}) => await seriesService.getSeriesInList(list),
  }
}

export const PullListMutation = {
  createPullList: async (root, { owner }) => {
    return await pullListService.getPullListByOwner(owner) || await pullListService.createPullList(owner)
  },
  pullSeries: async (root, { owner, publisher, seriesUrl }) => {
    const series = await seriesService.getSeriesByQuery({ publisher, url: seriesUrl })
    const _id = series ? series._id : await createNewSeries(publisher, seriesUrl)
    return await pullListService.addSeriesToPullList(owner, _id) || await pullListService.getPullListByOwner(owner)
  },
  removeSeries: async (root, { owner, series }) => await pullListService.removeSeriesFromPullList(owner, series)
}
