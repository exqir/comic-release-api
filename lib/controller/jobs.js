'use strict'
import { DependenciesFactory } from '../factories/dependencyFactory'
import logger from '../Logger'
import { scrap } from '../scraper/scraper'

export async function chooseJob ({ _id, job, data }) {
  switch (job) {
    case 'scrapIssue':
      await scrapIssue(_id, data)
      break
    case 'updateIssues':
      await updateIssues(_id, data)
      break
    default:
      await scrapIssues(_id, data)
  }
}

async function scrapIssues (id, { publisher, series }) {
  const { queueService, seriesService } = DependenciesFactory.getDependencies()
  const { issues } = await scrap('issues', publisher, series.issuesUrl)
  const storedSeries = await seriesService.getSeriesByIdWithIssueUrls(series._id)
  const storedUrls = storedSeries.issues.map(i => i.url)
  const promises = issues.map(async issue => {
    issue.series = series._id
    issue.publisher = publisher._id
    if (!storedUrls.includes(issue.url)) {
      logger.logMsg(`queue: add to queue ${series.title} - ${issue.title}`)
      return queueService.push({ job: 'scrapIssue', data: { publisher, comic: issue} })
    } else { 
      logger.logMsg(`queue: ${series.title} - ${issue.title} already exists`)
      return Promise.resolve()
    }
  })
  Promise.all(promises).then(async () => {
    logger.logMsg(`queue: added all issues of ${series.title} to queue`)
    await queueService.removeById(id)
  })
}

async function scrapIssue (id, { publisher, comic }) {
  const { comicService, queueService, seriesService } = DependenciesFactory.getDependencies()
  const issue = await scrap('issue', publisher, comic.url)
  const savedIssue = await comicService.createComic({...comic, ...issue})
  const i = await seriesService.addIssueToSeries(savedIssue.series, savedIssue._id)
  const q = await queueService.removeById(id)
  logger.logMsg(`queue: finished scrapIssue for ${savedIssue.title}`)
}

// data should be a series document with populated publisher (all) and issues (_id, url, releaseDate)
async function updateIssues(id, data) {
  const { comicService, queueService } = DependenciesFactory.getDependencies()
  const { series } = data
  const { issues } = await scrap('issues', series.publisher, series.issuesUrl)
  issues.map(async issue => {
    const existingIssue = series.issues.find(i => i.url === issue.url)
    if (existingIssue) {
      if (issue.releaseDate.getTime() !== existingIssue.releaseDate.getTime()) return await comicService.updateRealeaseDateOfComic(existingIssue._id, issue.releaseDate)
    } else {
      const enhancedIssue = { publisher: series.publisher._id, series: series._id, ...issue }
      logger.logMsg(`queue: add to queue ${series.title} - ${issue.title}`)
      return await queueService.push({ job: 'scrapIssue', data: { publisher: series.publisher, comic: enhancedIssue} }).catch((err) => console.log(err))
    }
  })
}
