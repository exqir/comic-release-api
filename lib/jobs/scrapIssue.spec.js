import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import { MockFactory } from '../factories/mockFactory'

let scraper
let scrapIssue

const imageConfig = MockFactory.getMock('image')

const issue = {
  title: 'Test Issue #2',
  url: '/comics/series/issues/2',
  releaseDate: '02.11.2111',
  series: '1234',
  publisher: 'image',
}

const scrapedProperties = {
  creators: [
    { author: 'Author' },
    { artist: 'Artist' },
  ],
  imageUrl: '/path/to/cover',
}

const removeById = td.func()
const addIssueToSeries = td.func()
const createComic = td.func()

const mockedDependecies = {
  queueService: {
    removeById,
  },
  seriesService: {
    addIssueToSeries,
  },
  comicService: {
    createComic,
  }
}

describe('jobs - scrapIssue', () => {
  beforeEach(() => {
    scraper = td.replace('../scraper/scraper')
    // needs to be required after the replacements
    scrapIssue = require('./scrapIssue').scrapIssue
    td.when(scraper.scrap('issue', imageConfig, issue.url))
      .thenResolve(scrapedProperties)
    td.when(createComic({...issue, ...scrapedProperties}))
      .thenResolve({...issue, ...scrapedProperties, _id: 5678 })
  })

  it('should save new issue and add it to series', async () => {
    await scrapIssue(1234, { publisher: imageConfig, comic: issue }, mockedDependecies)
    td.verify(addIssueToSeries({ ...issue, ...scrapedProperties, _id: 5678 }))
    td.verify(removeById(1234))
  })

  afterEach(() => {
    td.reset()
  })
})