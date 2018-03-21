'use strict'

import { Series } from '../models/Series'

import { scrap } from '../scraper/scraper'
import { getPublisher, addToPublisher } from './publisher'
import { addToQueue } from './queue'

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

export async function createNewSeries(publisher, seriesUrl) {
  const publisherConfig = await getPublisher(publisher)
  const scrapedSeries = await scrap('series', publisherConfig, seriesUrl)
  const series = await newSeries({...scrapedSeries, publisher, url: seriesUrl})
  return series && series._id
}

export async function updateSeries(series, update) {
  return await Series.findByIdAndUpdate(series, update, { new: true } )
}

export async function newSeries(comic) {
  return await new Series(comic).save()
}

export async function postSave(doc, next) {
  const { _id, publisher } = doc
  const publisherConfig = await getPublisher(publisher)
  const p = await addToPublisher(publisherConfig._id, _id)
  const q = await addToQueue({job: 'scrapIssues', data: { publisher: publisherConfig, series: doc }})
  next()
}