'use strict'

import PullList from '../../models/PullList'
import Series from '../../models/Series'

import { createNewSeries } from './series'

const PullListRoot = {
  pulllists: async (root, data) => await PullList.find().exec(),
  pulllist: async (root, { owner }) => await getPullListByOwner(owner),
}

const PullListResolver = {
  PullList: {
    list: async ({list}) => await Series.find().where('_id').in(list).exec(),
  }
}

const PullListMutation = {
  createPullList: async (root, { owner }) => {
    return await getPullListByOwner(owner) || await new PullList({ owner: owner, list: [] }).save()
  },
  pullSeries: async (root, { owner, publisher, seriesUrl }) => {
    const series = await Series.findOne({ publisher, url: seriesUrl }).exec()
    const _id = series ? series._id : await createNewSeries(publisher, seriesUrl)
    return await pushSeriesToPullList(owner, _id) || await getPullListByOwner(owner)
  },
  removeSeries: async (root, { owner, series }) => await PullList.findOneAndUpdate({ owner: owner }, { $pull: {list: series} }, { new: true }).exec()
}

async function getPullListByOwner (owner) {
  return await PullList.findOne({ owner: owner }).exec()
}

async function pushSeriesToPullList(owner, series) {
  return await PullList.findOneAndUpdate({ owner: owner, list: {$ne: series} }, { $push: {list: series} }, { new: true })
}

module.exports = {
  PullListRoot,
  PullListResolver,
  PullListMutation,
}
