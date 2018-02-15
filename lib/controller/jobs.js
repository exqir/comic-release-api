'use strict'
import logger from '../Logger'

import { scrap } from '../scraper/scraper'
import { newComic } from './comic'
import { addToQueue } from './queue'
import { updateSeries } from './series'

export const chooseJob = (doc, next) => {
  const { job, data } = doc
  switch (job) {
    case 'scrapIssue':
      scrapIssue(data, next)
      break
    default:
      scrapIssues(data, next)
  }
}

async function scrapIssues (data, next) {
  const { publisher, series } = data
  const result = await scrap('issues', publisher, series.issuesUrl)
  const { issues } = result
  issues.map(async issue => {
    issue.series = series._id
    issue.publisher = publisher._id
    await addToQueue({ job: 'scrapIssue', data: { publisher, comic: issue} }).catch((err) => console.log(err))
    logger.logMsg(`queue: added to queue ${series.title} - ${issue.title}`)
  })
  logger.logMsg(`queue: added all issues of ${series.title} to queue`)
  next()
}

async function scrapIssue (data, next) {
  const { publisher, comic } = data
  const { issue } = await scrap('issue', publisher, comic.url)
  const enhancedIssue = {...comic, ...issue}
  const savedIssue = await newComic(enhancedIssue)
  await updateSeries(savedIssue.series, { $push: {issues: savedIssue._id} }).catch((err) => console.log(err))
  logger.logMsg(`queue: finished scrapIssue for ${savedIssue.title}`)
  next()
}
