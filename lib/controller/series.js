'use strict'

import Series from '../models/Series'

import { scrap } from '../scraper/scraper'
import { getPublisher, addToPublisher } from './publisher'
import { addToQueue } from './queue'

export async function getSeries(id) {
  return Series.findById(id).exec()
}

export async function getSeriesBy(obj) {
  return await Series.findOne(obj).exec()
}

export async function getSeriesIn(list) {
  return await Series.find().where('_id').in(list).exec()
}

export async function createNewSeries(publisher, seriesUrl) {
  const publisherConfig = await getPublisher(publisher)
  const scrapedSeries = await scrap('series', publisherConfig, seriesUrl)
  const series = scrapedSeries ? await newSeries({...scrapedSeries, publisher, url: seriesUrl}) : null
  const p = series ? await addToPublisher(publisher, series._id) : null
  const q = series ? await addToQueue({job: 'scrapIssues', data: { publisher: publisherConfig, series }}) : null
  return q && series && series._id
}

export async function updateSeries(series, update) {
  return await Series.findByIdAndUpdate(series, update, { new: true } )
}

export async function newSeries(comic) {
  return await new Series(comic).save()
}