'use strict'

import { createNewSeries } from '../../controller/series'
import { getSeriesIn, getSeriesBy } from '../../adapter/series'
import { getAllPullLists, getPullListByOwner, newPullList,
   addSeriesToPullList, removeSeriesFromPullList } from '../../adapter/pulllist'

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
