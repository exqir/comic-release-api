'use strict'

import logger from '../Logger'
import { scrap } from '../scraper/scraper'
import { newComic } from './comic'
import { addToQueue, removeFromQueue } from './queue'
import { updateSeries } from './series'

export const chooseJob = (doc, next) => {
  const { _id, job, data } = doc
  switch (job) {
    case 'scrapIssue':
      scrapIssue(_id, data, next)
      break
    default:
      scrapIssues(_id, data, next)
  }
}

async function scrapIssues (id, data, next) {
  const { publisher, series } = data
  const result = await scrap('issues', publisher, series.issuesUrl)
  const { issues } = result
  const promises = issues.map(async issue => {
    issue.series = series._id
    issue.publisher = publisher._id
    logger.logMsg(`queue: add to queue ${series.title} - ${issue.title}`)
    return await addToQueue({ job: 'scrapIssue', data: { publisher, comic: issue} }).catch((err) => console.log(err))
  })
  Promise.all(promises).then(async () => {
    logger.logMsg(`queue: added all issues of ${series.title} to queue`)
    await removeFromQueue(id)
  })
  next()
}

async function scrapIssue (id, data, next) {
  const { publisher, comic } = data
  const { issue } = await scrap('issue', publisher, comic.url)
  const enhancedIssue = {...comic, ...issue}
  const savedIssue = await newComic(enhancedIssue)
  await updateSeries(savedIssue.series, { $push: {issues: savedIssue._id} }).catch((err) => console.log(err))
  await removeFromQueue(id)
  logger.logMsg(`queue: finished scrapIssue for ${savedIssue.title}`)
  next()
}
