'use strict'

import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import { createNewSeries, postSave } from './series'
import { image } from '../scraper/publisher/image'

let { getPublisher, addToPublisher } = require('./publisher')
let scrap = require ('../scraper/scraper').scrap
let newSeries = require('./series').newSeries
let addToQueue = require('./pulllist').addToQueue

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
  url: '/comic/series/test'
}

const job = {
  job: 'scrapIssues',
  data: { publisher: imageConfig, series: enhancedSeries }
}

describe('series controller tests', () => {
  before(() => {
    getPublisher = td.replace('./publisher').getPublisher
    addToPublisher = td.replace('./publisher').addToPublisher
    scrap = td.replace('../scraper/scraper').scrap
    newSeries = td.replace('./series').newSeries
    addToQueue = td.replace('./queue').addToQueue
  })

  beforeEach(() => {
    td.when(getPublisher('image')).thenReturn(Promise.resolve(imageConfig))
  })

  describe('create new series', () => {
    beforeEach(() => {
      td.when(scrap('series', imageConfig, '/comics/series/test')).thenReturn(Promise.resolve(series))
      td.when(newSeries(enhancedSeries)).thenReturn(Promise.resolve({...enhancedSeries, _id: '1234'}))
    })

    it('should return id of newly created series', () => {
      const id = createNewSeries('image', '/comic/series/test')
      assert(id, '1234')
    })

    it('should return falsy value when failed to scrap', () => {
      td.when(scrap('series', imageConfig, '/comics/series/test')).thenReturn(Promise.resolve({}))
      const id = createNewSeries('image', '/comic/series/test')
      assert(id, undefined) // td returns undefinde in case function is not called with the defined parameters
    })

    it('should return falsy value when failed to save', () => {
      td.when(newSeries(enhancedSeries)).thenReturn(Promise.resolve(null))
      const id = createNewSeries('image', '/comic/series/test')
      assert(id, null) // @TODO what does mongoose return in case save() failes, 
    })
  })

  describe('post hook for new series', () => {
    it('should call update functions with correct parameters', () => {
      postSave({...enhancedSeries, _id: '1234'}, () => null)
      td.verify(addToPublisher(imageConfig._id, '1234'))
      td.verify(addToQueue({job: 'scrapIssues', data: { publisher: imageConfig, series: {...enhancedSeries, _id: '1234'} }}))
    })
  })

  afterEach(() => {
    td.reset()
  })
})
