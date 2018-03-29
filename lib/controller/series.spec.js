'use strict'

import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

let scraper
let newSeries
let addToQueue
let publisherAdapter
let seriesModule

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
  title: 'Test Series Title',
  collectionsUrl: '/collections/test',
  issuesUrl: '/issues/url'
}

const enhancedSeries = {
  ...series,
  publisher: 'image',
  url: '/comics/series/test'
}

const job = {
  job: 'scrapIssues',
  data: { publisher: imageConfig, series: enhancedSeries }
}

describe('series controller tests', () => {
  beforeEach(() => {
    publisherAdapter = td.replace('../adapter/publisher')
    addToQueue = td.replace('../adapter/queue').addToQueue
    newSeries = td.replace('../adapter/series').newSeries
    scraper = td.replace('../scraper/scraper')

    seriesModule = require('./series')

    td.when(publisherAdapter.getPublisher('image'))
      .thenResolve(imageConfig)
  })

  describe('create new series', () => {
    beforeEach(() => {
      td.when(scraper.scrap('series', imageConfig, '/comics/series/test'))
        .thenResolve(series)
      td.when(newSeries(enhancedSeries))
        .thenResolve({...enhancedSeries, _id: '1234'})
    })

    it('should return id of newly created series', async () => {
      const id = await seriesModule.createNewSeries('image', '/comics/series/test')
      assert.equal(id, '1234')
    })

    it('should return falsy value when failed to scrap', async () => {
      td.when(scraper.scrap('series', imageConfig, '/comics/series/test'))
        .thenResolve({})
      const id = await seriesModule.createNewSeries('image', '/comic/series/test')
      assert.equal(id, undefined) // td returns undefinde in case function is not called with the defined parameters
    })

    it('should return falsy value when failed to save', async () => {
      td.when(newSeries(enhancedSeries))
        .thenResolve(null)
      const id = await seriesModule.createNewSeries('image', '/comic/series/test')
      assert.equal(id, null) // @TODO what does mongoose return in case save() failes, 
    })
  })

  describe('post save hook for new series', () => {
    it('should call update functions with correct parameters', async () => {
      await seriesModule.postSave({...enhancedSeries, _id: '1234'})
      td.verify(publisherAdapter.addToPublisher(imageConfig._id, '1234'))
      td.verify(addToQueue({job: 'scrapIssues', data: { publisher: imageConfig, series: {...enhancedSeries, _id: '1234'} }}))
    })
  })

  afterEach(() => {
    td.reset()
  })
})
