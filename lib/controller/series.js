'use strict'

import Series from '../models/Series'

import { scrap } from '../scraper/scraper'
import { getPublisher } from './publisher'
import { addToQueue } from './queue'

export async function getSeries(id) {
  return Series.findById(id).exec()
}

export async function getSeriesBy(obj) {
  return await Series.find(obj).exec()
}

export async function getSeriesIn(list) {
  return await Series.find().where('_id').in(list).exec()
}

export async function newSeries(publisher, seriesUrl) {
  const publisherConfig = await getPublisher(publisher)
  const scrapedSeries = await scrap('series', publisherConfig, seriesUrl)
  const series = await addSeries({...scrapedSeries, publisher, url: seriesUrl})
  const queue = {
    job: 'scrapIssues', 
    data: { 
      publisher: publisherConfig,
      series
    }
  }
  const q = await addToQueue(queue)
  return q && series._id
}

async function addSeries(comic) {
  return await new Series(comic).save()
}