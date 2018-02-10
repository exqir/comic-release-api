'use strict'
import { Promise } from 'bluebird';
import { series as scrapSeries } from 'comic-scraper'

import Queue from '../../models/Queue'
import Series from '../../models/Series'

import { scrap } from '../../scraper/scraper'
import { getPublisher } from './publisher'
import { getComics } from './comic'

export const SeriesRoot = {
  series: async (root, { id }) => await Series.findById(id).exec()
}

export const SeriesResolver = {
  Series: {
    issues: async ({ issues }) => await getComics(issues),
  }
}

export async function createNewSeries(publisher, seriesUrl) {
  const publisherConfig = await getPublisher(publisher)
  const scrapedSeries = await scrap('series', publisherConfig, seriesUrl)
  const series = await saveSeries({...scrapedSeries, publisher, url: seriesUrl})
  const queue = {
    job: 'scrapIssues', 
    data: { 
      publisher: publisherConfig,
      series
    }
  }
  const q = await new Queue(queue).save()
  return q && series._id
}

export async function saveSeries(comic) {
  return await new Series(comic).save()
}
