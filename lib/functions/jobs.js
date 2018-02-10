'use strict'
import logger from '../Logger'

import Queue from '../models/Queue'
import Comic from '../models/Comic'
import Series from '../models/Series'

import { scrap } from '../scraper/scraper'

const chooseJob = (doc, next) => {
  const { job, data } = doc
  switch (job) {
    case 'scrapIssues':
      scrapIssues(data, next)
      break
    case 'scrapIssue':
      scrapIssue(data, next)
      break
    default:
      next()
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
    await new Queue({ job: 'scrapIssue', data: { publisher, comic: issue} })
  }
  logger.logMsg('queue: finised scrapIssues')
  next()
}

async function scrapIssue (data, next) {
  const { publisher, comic } = data
  const { issue } = await scrap('issue', publisher, comic.url)
  const savedIssue = await new Comic(issue).save()
  await Series.findByIdAndUpdate(issue.series, { $push: {issues: savedIssue._id} }, { new: true } )
  logger.logMsg('queue: finised scrapIssue')
  next()
}

export default chooseJob