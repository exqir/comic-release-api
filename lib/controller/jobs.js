'use strict'

import logger from '../Logger'
import { scrap } from '../scraper/scraper'
import { newComic } from './comic'
import { addToQueue, removeFromQueue } from './queue'
import { updateSeries, getSeriesWithIssueUrls, updateRealeaseDate } from './series'

export const chooseJob = (doc, next) => {
  const { _id, job, data } = doc
  switch (job) {
    case 'scrapIssue':
      scrapIssue(_id, data, next)
      break
    case 'updateIssues':
      updateIssues(_id, data, next)
      break
    default:
      scrapIssues(_id, data, next)
  }
}

async function scrapIssues (id, data, next) {
  const { publisher, series } = data
  const { issues } = await scrap('issues', publisher, series.issuesUrl)
  const storedSeries = await getSeriesWithIssueUrls(series._id)
  const storedUrls = storedSeries.issues.map(i => i.url)
  const promises = issues.map(async issue => {
    issue.series = series._id
    issue.publisher = publisher._id
    if (!storedUrls.includes(issue.url)) {
      logger.logMsg(`queue: add to queue ${series.title} - ${issue.title}`)
      return await addToQueue({ job: 'scrapIssue', data: { publisher, comic: issue} }).catch((err) => console.log(err))
    } else { 
      logger.logMsg(`queue: ${series.title} - ${issue.title} already exists`)
      return Promise.resolve()
    }
  })
  Promise.all(promises).then(async () => {
    logger.logMsg(`queue: added all issues of ${series.title} to queue`)
    await removeFromQueue(id)
  })
  next()
}

async function scrapIssue (id, data, next) {
  const { publisher, comic } = data
  const issue = await scrap('issue', publisher, comic.url)
  const savedIssue = await newComic({...comic, ...issue})
  await updateSeries(savedIssue.series, { $push: {issues: savedIssue._id} }).catch((err) => console.log(err))
  await removeFromQueue(id)
  logger.logMsg(`queue: finished scrapIssue for ${savedIssue.title}`)
  next()
}

// data should be a series document with populated publisher (all) and issues (_id, url, releaseDate)
async function updateIssues(id, data, next) {
  const { series } = data
  const { issues } = await scrap('issues', series.publisher, series.issuesUrl)
  issues.map(async issue => {
    const existingIssue = series.issues.find(i => i.url === issue.url)
    if (existingIssue) {
      if (issue.releaseDate.getTime() !== existingIssue.releaseDate.getTime()) return await updateRealeaseDate(existingIssue._id, issue.releaseDate)
    } else {
      const enhancedIssue = { publisher: series.publisher._id, series: series._id, ...issue }
      logger.logMsg(`queue: add to queue ${series.title} - ${issue.title}`)
      return await addToQueue({ job: 'scrapIssue', data: { publisher: series.publisher, comic: enhancedIssue} }).catch((err) => console.log(err))
    }
  })
  next()
}
