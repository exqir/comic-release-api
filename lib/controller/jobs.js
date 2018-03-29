'use strict'

import logger from '../Logger'
import { scrap } from '../scraper/scraper'
import { newComic } from '../adapter/comic'
import { addToQueue, removeFromQueue } from '../adapter/queue'
import { addIssueToSeries, getSeriesWithIssueUrls, updateReleaseDate } from '../adapter/series'

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
  const { issues } = await scrap('issues', publisher, series.issuesUrl)
  const storedSeries = await getSeriesWithIssueUrls(series._id)
  const storedUrls = storedSeries.issues.map(i => i.url)
  const promises = issues.map(async issue => {
    issue.series = series._id
    issue.publisher = publisher._id
    if (!storedUrls.includes(issue.url)) {
      logger.logMsg(`queue: add to queue ${series.title} - ${issue.title}`)
      return addToQueue({ job: 'scrapIssue', data: { publisher, comic: issue} })
    } else { 
      logger.logMsg(`queue: ${series.title} - ${issue.title} already exists`)
      return Promise.resolve()
    }
  })
  Promise.all(promises).then(async () => {
    logger.logMsg(`queue: added all issues of ${series.title} to queue`)
    await removeFromQueue(id)
  })
}

async function scrapIssue (id, { publisher, comic }) {
  const issue = await scrap('issue', publisher, comic.url)
  const savedIssue = await newComic({...comic, ...issue})
  const i = await addIssueToSeries(savedIssue.series, savedIssue._id)
  const q = await removeFromQueue(id)
  logger.logMsg(`queue: finished scrapIssue for ${savedIssue.title}`)
}

// data should be a series document with populated publisher (all) and issues (_id, url, releaseDate)
async function updateIssues(id, data) {
  const { series } = data
  const { issues } = await scrap('issues', series.publisher, series.issuesUrl)
  issues.map(async issue => {
    const existingIssue = series.issues.find(i => i.url === issue.url)
    if (existingIssue) {
      if (issue.releaseDate.getTime() !== existingIssue.releaseDate.getTime()) return await updateReleaseDate(existingIssue._id, issue.releaseDate)
    } else {
      const enhancedIssue = { publisher: series.publisher._id, series: series._id, ...issue }
      logger.logMsg(`queue: add to queue ${series.title} - ${issue.title}`)
      return await addToQueue({ job: 'scrapIssue', data: { publisher: series.publisher, comic: enhancedIssue} }).catch((err) => console.log(err))
    }
  })
}
