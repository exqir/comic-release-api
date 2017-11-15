'use strict'

import { series as scrapSeries } from 'comic-scraper'

import PullList from '../../models/PullList'
import Series from '../../models/Series'

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
    const pullList = await getPullListByOwner(owner)
    if (pullList) return pullList
    return await new PullList({ owner: owner, list: [] }).save()
  },
  pullSeries: async (root, { owner, publisher, seriesUrl }) => {
    const existingSeries = await Series.find({ publisher: publisher._id, url: seriesUrl }).exec()
    if (existingSeries) return await pushSeriesToPullList(owner, existingSeries._id)
    const series = await new Promise((resolve, reject) => scrapSeries(publisher, seriesUrl, (err, seriesObject) => resolve(seriesObject)))
    const { _id } = await new Series(series).save()
    return await pushSeriesToPullList(owner, _id)
  }
}

async function getPullListByOwner (owner) {
  return await PullList.findOne({ owner: owner }).exec()  
}

async function pushSeriesToPullList(owner, series) {
  return await PullList.findOneAndUpdate({ owner: owner, list: {$ne: series} }, { $push: {list: series} }, {new: true})  
} 

module.exports = {
  PullListRoot,
  PullListResolver,
  PullListMutation,
}
