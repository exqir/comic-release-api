'use strict'
import { scrap } from '../scraper/scraper'

export async function createNewSeries(publisher, seriesUrl, { publisherService, seriesService }) {
  const publisherConfig = await publisherService.getPublisherByName(publisher)
  const scrapedSeries = await scrap('series', publisherConfig, seriesUrl)
  const series = await seriesService.createSeries({...scrapedSeries, publisher, url: seriesUrl})
  return series && series._id
}

export function postSave ({ publisherService, queueService }) {
  return async function (doc) {
    const { _id, publisher } = doc
    const publisherConfig = await publisherService.getPublisherByName(publisher)
    await publisherService.addSeriesToPublisher(publisherConfig._id, _id)
    await queueService.push({job: 'scrapIssues', data: { publisher: publisherConfig, series: doc }})
  }
}
