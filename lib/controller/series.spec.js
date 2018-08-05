'use strict'

import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import { MockFactory } from '../factories/mockFactory'

let scraper
let seriesController

const imageConfig = MockFactory.getMock('image')

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

const getPublisherByName = td.func()
const addSeriesToPublisher = td.func()
const push = td.func()
const createSeries = td.func()

const mockedDependecies = {
  publisherService: {
    getPublisherByName,
    addSeriesToPublisher,
  },
  queueService: {
    push,
  },
  seriesService: {
    createSeries,
  },
}

describe('controller - series', () => {
  beforeEach(() => {
    scraper = td.replace('../scraper/scraper')
    // needs to be required after the replacements
    seriesController = require('./series')
    td.when(getPublisherByName('image'))
      .thenResolve(imageConfig)
  })

  describe('create new series', () => {
    beforeEach(() => {
      td.when(scraper.scrap('series', imageConfig, '/comics/series/test'))
        .thenResolve(series)
      td.when(createSeries(enhancedSeries))
        .thenResolve({...enhancedSeries, _id: '1234'})
    })

    it('should return id of newly created series', async () => {
      const id = await seriesController.createNewSeries('image', '/comics/series/test', mockedDependecies)
      assert.equal(id, '1234')
    })

    it('should return falsy value when failed to scrap', async () => {
      td.when(scraper.scrap('series', imageConfig, '/comics/series/test'))
        .thenResolve({})
      const id = await seriesController.createNewSeries('image', '/comic/series/test', mockedDependecies)
      assert.equal(id, undefined) // td returns undefinde in case function is not called with the defined parameters
    })

    it('should return falsy value when failed to save', async () => {
      td.when(createSeries(enhancedSeries))
        .thenResolve(null)
      const id = await seriesController.createNewSeries('image', '/comic/series/test', mockedDependecies)
      assert.equal(id, null) // @TODO what does mongoose return in case save() failes, 
    })
  })

  describe('post save hook for new series', () => {
    it('should call update functions with correct parameters', async () => {
      const handlePostSave = seriesController.postSave(mockedDependecies)
      await handlePostSave({...enhancedSeries, _id: '1234'})
      td.verify(addSeriesToPublisher(imageConfig._id, '1234'))
      td.verify(push({job: 'scrapIssues', data: { publisher: imageConfig, series: {...enhancedSeries, _id: '1234'} }}))
    })
  })

  afterEach(() => {
    td.reset()
  })
})
