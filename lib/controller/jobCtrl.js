'use strict'

const scraper = require('comic-scraper')

const db = require('./dbCtrl')
const Logger = require('../Logger')
const util = require('../util')

function initSeries (publisher, series) {
  const that = {
    publisher: publisher.id,
    series: series.id
  }
  scraper.issues(publisher, series, function (err, result) {
    if (err) return Logger.logError('error: issues job failed because of scraper ' + err.message)
    const issues = result.map(addIdsToIssue, that)
    issues.map(function (issue) {
      enhanceIssue(issue, publisher)
    })
    // db.issues.createMany(issues, function (err, issues) {
    //   enhanceIssues(err, issues, publisher)
    // })
  })
}

function addIdsToIssue (issue) {
  issue.publisher = this.publisher
  issue.series = this.series
  return issue
}

function enhanceIssue (issue, publisher) {
  scraper.issue(publisher, issue, function (err, result) {
    if (err) return Logger.logError('error: issue job failed because of scraper ' + err.message)
    db.issues.create(result, function (err, savedIssue) {
      if (err) return Logger.logError('error: issue job failed because of database ' + err.message)
      Logger.logMsg('job: updated ' + savedIssue.title)
      db.series.addIssue(savedIssue.series, savedIssue.id, function (err, updatedSeries) {
        if (err) return Logger.logError('error: issue job failed because of database ' + err.message)
        Logger.logMsg('job: updated ' + updatedSeries.title + ' has know ' + updatedSeries.issues.length + ' issues')
      })
    })
  })
}
// function enhanceIssues (err, issues, publisher) {
//   if (err) return Logger.logError('error: issue job failed because of database ' + err.message)
//   Logger.logMsg('job: created ' + issues.length + ' issues')
//   scraper.issue(publisher, issues[0], updateIssue)
//   // issues.map(function (issue) {
//   //   scraper.issue(publisher, issue, updateIssue)
//   // })
// }

function updateIssue (err, issue) {
  console.log('DEBUG : inside updateIssue')
  if (err) return Logger.logError('error: issue job failed because of scraper ' + err.message)
  db.issues.editOne(issue, function (err, updatedIssue) {
    if (err) return Logger.logError('error: issue job failed because of database ' + err.message)
    return Logger.logMsg('job: updated ' + updatedIssue.title)
  })
}

module.exports = {
  initSeries: initSeries
}
