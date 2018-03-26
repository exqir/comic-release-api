'use strict'

import Publisher from '../models/Publisher'

export async function getAllPublishers() {
  return await Publisher.find().exec()
}

export async function getPublisher(name) {
  return await Publisher.findOne({ _id: name }).exec()
}

export async function getPublishersIn(names) {
  return await Publisher.find().where('_id').in(names).exec()
}

export async function addToPublisher(name, series) {
  return await Publisher.findOneAndUpdate({ _id: name, series: {$ne: series} }, { $push: {series: series} }, { new: true })
}
