'use strict'

import { Series } from '../models/Series'

export async function newSeries(comic) {
  return await new Series(comic).save()
}

export async function getSeries(id) {
  return await Series.findById(id).exec()
}

export async function getSeriesBy(obj) {
  return await Series.findOne(obj).exec()
}

export async function getSeriesIn(list) {
  return await Series.find().where('_id').in(list).exec()
}

export async function getSeriesWithIssueUrls(id) {
  return await Series.findById(id).populate('issues', 'url').exec()
}

export async function addIssueToSeries(id, issue) {
  return await updateSeries(id, { $push: {issues: issue} })
}

async function updateSeries(series, update) {
  return await Series.findByIdAndUpdate(series, update, { new: true } )
}