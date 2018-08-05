import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import { MockFactory } from '../factories/mockFactory'

let scraper
let scrapIssues

const imageConfig = MockFactory.getMock('image')

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

const push = td.func()
const removeById = td.func()
const getSeriesByIdWithIssueUrls = td.func()

const mockedDependecies = {
  queueService: {
    push,
    removeById,
  },
  seriesService: {
    getSeriesByIdWithIssueUrls,
  },
}

describe('jobs - scrapIssues', () => {
  beforeEach(() => {
    scraper = td.replace('../scraper/scraper')
    // needs to be required after the replacements
    scrapIssues = require('./scrapIssues').scrapIssues
    td.when(scraper.scrap('issues', imageConfig, series.issuesUrl))
      .thenResolve({ issues })
    td.when(getSeriesByIdWithIssueUrls(series._id))
      .thenResolve(series)
    td.when(push({ job: 'scrapIssue', data: { publisher: imageConfig, comic: issues[1] }})).thenResolve()
  })

  it('should add each new issue to queue', async () => {
    await scrapIssues(1234, { publisher: imageConfig, series }, mockedDependecies)
    // td.verify(push({ job: 'scrapIssue', data: { publisher: imageConfig, comic: issues[1] }}))
    td.verify(removeById(1234))
  })

  afterEach(() => {
    td.reset()
  })
})