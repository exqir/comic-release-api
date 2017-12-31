'use strict'

import { issues, issue } from 'comic-scraper'
import logger from '../Logger'

import Queue from '../models/Queue'
import Comic from '../models/Comic'
import Series from '../models/Series'

const chooseJob = (doc, next) => {
  const job = doc.job
  switch (job) {
    case 'scrapIssues':
      scrapIssues(doc.data, next)
      break
    case 'scrapIssue':
      scrapIssue(doc.data, next)
      break
    default:
      next()
  }
}

async function scrapIssues (data, next) {
  const { publisher, series } = data
  const scrapedIssues = await new Promise((resolve, reject) => issues(publisher, series, (err, issuesObject) => resolve(issuesObject)))
  for (let i=0; i <= scrapedIssues.length; i++) {
    const issue = scrapedIssues[i]
    issue.series = series._id
    issue.publisher = publisher._id
    await new Queue({ job: 'scrapIssue', data: { publisher, issue} })
  }
  logger.logMsg(`queue: finised scrapIssues`)
  next()
}

async function scrapIssue (data, next) {
  const { publisher, issue } = data
  const scrapedIssue = await new Promise((resolve, reject) => issue(publisher, issue, (err, issueObject) => resolve(issueObject)))
  savedIssue = await new Comic(scrapedIssue).save()
  await Series.findByIdAndUpdate(issue.series, { $push: {issues: issue._id} }, { new: true } )
  logger.logMsg(`queue: finised scrapIssue`)
  next()
}

export default chooseJob