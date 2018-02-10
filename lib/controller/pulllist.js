'use strict'

import PullList from '../models/PullList'

export async function getAllPullLists() {
  return await PullList.find().exec()
}

export async function getPullListByOwner(owner) {
  return await PullList.findOne({ owner }).exec()
}

export async function addPullList(owner) {
  return await new PullList({ owner, list: [] }).save()
}

export async function addSeriesToPullList(owner, series) {
  return await PullList.findOneAndUpdate({ owner: owner, list: {$ne: series} }, { $push: {list: series} }, { new: true })
}

export async function removeSeriesFromPullList(owner, series) {
  return await PullList.findOneAndUpdate({ owner }, { $pull: {list: series} }, { new: true }).exec()
}
