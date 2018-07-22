'use strict'
import { DependenciesFactory } from '../factories/dependencyFactory'
import { scrap } from '../scraper/scraper'

export async function createNewSeries(publisher, seriesUrl) {
  const { publisherService, seriesService } = DependenciesFactory.getDependencies()
  const publisherConfig = await publisherService.getPublisherByName(publisher)
  const scrapedSeries = await scrap('series', publisherConfig, seriesUrl)
  const series = await seriesService.createSeries({...scrapedSeries, publisher, url: seriesUrl})
  return series && series._id
}

export async function postSave(doc) {
  const { publisherService, queueService } = DependenciesFactory.getDependencies()
  const { _id, publisher } = doc
  const publisherConfig = await publisherService.getPublisherByName(publisher)
  const p = await publisherService.addSeriesToPublisher(publisherConfig._id, _id)
  const q = await queueService.push({job: 'scrapIssues', data: { publisher: publisherConfig, series: doc }})
}
