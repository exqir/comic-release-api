'use strict'

import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

let scraper
let newComic
let queueModule
let seriesAdapter
let jobsModule
let next

const imageConfig = {
  '_id': 'image',
  'name': 'Image Comics',
  'iconUrl': 'https://imagecomics.com/assets/img/header-logo.png',
  'url': 'https://imagecomics.com',
  'baseUrl': 'http://localhost:3001/image',
  'searchPath': '/search/results?keywords=',
  'searchSeriesPath': '/search.html?',
  'seriesPath': '/comcis/series/'
}

const series = {
  _id: '1234',
  title: 'Test Series Title',
  collectionsUrl: '/collections/test',
  issuesUrl: '/issues/url',
  publisher: 'image',
  url: '/comics/series/test',
  issues: [
    {
      title: 'Test Issue #1',
      url: '/comics/series/issues/1',
      releaseDate: '01.11.2111',
    }
  ]
}

const issues = [
  ...series.issues,
  {
    title: 'Test Issue #2',
    url: '/comics/series/issues/2',
    releaseDate: '02.11.2111',
    series: '1234',
    publisher: 'image',
  }
]

const issue = {
  creators: [
    { author: 'Author' },
    { artist: 'Artist' },
  ],
  imageUrl: '/path/to/cover',
}

const issuesScrapResult = {
  issues
}

const issuesDoc = {
  _id: '1234',
  job: 'scrapIssues',
  data: {
    publisher: imageConfig,
    series,
  }
}

const issueDoc = {
  _id: '1234',
  job: 'scrapIssue',
  data: {
    publisher: imageConfig,
    comic: issues[1],
  }
}

describe('jobs controller tests', () => {
  beforeEach(() => {
    seriesAdapter = td.replace('../adapter/series')
    queueModule = td.replace('../adapter/queue')
    newComic = td.replace('../adapter/comic').newComic
    scraper = td.replace('../scraper/scraper')

    jobsModule = require('./jobs')
  })

  describe('scrapIssues', () => {
    beforeEach(() => {
      td.when(scraper.scrap('issues', imageConfig, series.issuesUrl))
        .thenResolve(issuesScrapResult)
      td.when(seriesAdapter.getSeriesWithIssueUrls(series._id))
        .thenResolve(series)
    })

    it('should add each new issue to queue', async () => {
      jobsModule.chooseJob(issuesDoc)
      td.verify(queueModule.addToQueue({ job: 'scrapIssue', data: { publisher: issuesDoc.data.publisher, comic: issues[1]}}))
      td.verify(queueModule.removeFromQueue(issuesDoc._id))
    })
  })

  describe('scrapIssue', () => {
    beforeEach(() => {
      td.when(scraper.scrap('issue', imageConfig, issues[1].url))
        .thenResolve(issue)
      td.when(newComic({...issues[1], ...issue}))
        .thenResolve({...issues[1], ...issue, _id: '1234'})
    })

    it('should save new issue and add it to series', async () => {
      await jobsModule.chooseJob(issueDoc)
      td.verify(seriesAdapter.addIssueToSeries(series._id, '1234'))
      td.verify(queueModule.removeFromQueue(issueDoc._id))
    })
  })

  afterEach(() => {
    td.reset()
  })
})
