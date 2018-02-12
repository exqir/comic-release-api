'use strict'

import { describe, it, before, beforeEach, afterEach } from 'mocha'
import { assert } from 'chai'
import td from 'testdouble'

import { createNewSeries } from './series'
import { image } from '../scraper/publisher/image';

let getPublisher = require('./publisher').getPublisher
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
    scrap = td.replace('../scraper/scraper').scrap
    newSeries = td.replace('./series').newSeries
    addToQueue = td.replace('./queue').addToQueue
  })

  beforeEach(() => {
    td.when(getPublisher('image')).thenReturn(imageConfig)
    td.when(scrap('series', imageConfig, '/comics/series/test')).thenReturn(series)
    td.when(newSeries(enhancedSeries)).thenReturn({...enhancedSeries, _id: '1234'})
    td.when(addToQueue(job)).thenReturn(true)
  })

  describe('successfully created new series', () => {
    it('should return id of newly created series', () => {
      td.when(getPublisher('image')).thenReturn(imageConfig)
      td.when(scrap('series', imageConfig, '/comics/series/test')).thenReturn(series)
      td.when(newSeries(enhancedSeries)).thenReturn({...enhancedSeries, _id: '1234'})
      td.when(addToQueue(job)).thenReturn(true)
      const id = createNewSeries('image', '/comic/series/test')
      assert(id, '1234')
    })
  })

  describe('failed to add event to queue', () => {
    it('should return falsy value', () => {
      td.when(addToQueue(job)).thenReturn(false)
      const id = createNewSeries('image', '/comic/series/test')
      assert(id, false)
    })
  })

  describe('failed to scrap series', () => {
    it('should return falsy value', () => {
      td.when(scrap('series', imageConfig, '/comics/series/test')).thenReturn(null)
      const id = createNewSeries('image', '/comic/series/test')
      assert(id, undefined)
    })
  })

  afterEach(() => {
    td.reset()
  })
})
