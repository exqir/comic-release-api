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
  for (let i=0; i <= issues.length; i++) {
    const issue = issues[i]
    issue.series = series._id
    issue.publisher = publisher._id
    await addToQueue({ job: 'scrapIssue', data: { publisher, comic: issue} })
  }
  logger.logMsg('queue: finised scrapIssues')
  next()
}

async function scrapIssue (data, next) {
  const { publisher, comic } = data
  const { issue } = await scrap('issue', publisher, comic.url)
  const savedIssue = await newComic(issue)
  await updateSeries(issue.series, { $push: {issues: savedIssue._id} })
  logger.logMsg('queue: finised scrapIssue')
  next()
}
