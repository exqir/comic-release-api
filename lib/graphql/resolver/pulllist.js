'use strict'

import { createNewSeries, getSeriesIn, getSeriesBy } from '../../controller/series'
import { getAllPullLists, getPullListByOwner, newPullList,
   addSeriesToPullList, removeSeriesFromPullList } from '../../controller/pulllist'

export const PullListRoot = {
  pulllists: async (root, data) => await getAllPullLists(),
  pulllist: async (root, { owner }) => await getPullListByOwner(owner),
}

export const PullListResolver = {
  PullList: {
    list: async ({list}) => await getSeriesIn(list),
  }
}

export const PullListMutation = {
  createPullList: async (root, { owner }) => {
    return await getPullListByOwner(owner) || await newPullList(owner)
  },
  pullSeries: async (root, { owner, publisher, seriesUrl }) => {
    const series = await getSeriesBy({ publisher, url: seriesUrl })
    const _id = series ? series._id : await createNewSeries(publisher, seriesUrl)
    return await addSeriesToPullList(owner, _id) || await getPullListByOwner(owner)
  },
  removeSeries: async (root, { owner, series }) => await removeSeriesFromPullList(owner, series)
}
