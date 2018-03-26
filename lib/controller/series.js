'use strict'

import { scrap } from '../scraper/scraper'
import { getPublisher, addToPublisher } from '../adapter/publisher'
import { addToQueue } from '../adapter/queue'
import { newSeries } from '../adapter/series'

export async function createNewSeries(publisher, seriesUrl) {
  const publisherConfig = await getPublisher(publisher)
  const scrapedSeries = await scrap('series', publisherConfig, seriesUrl)
  const series = await newSeries({...scrapedSeries, publisher, url: seriesUrl})
  return series && series._id
}

export async function postSave(doc, next) {
  const { _id, publisher } = doc
  const publisherConfig = await getPublisher(publisher)
  const p = await addToPublisher(publisherConfig._id, _id)
  const q = await addToQueue({job: 'scrapIssues', data: { publisher: publisherConfig, series: doc }})
  next()
}
