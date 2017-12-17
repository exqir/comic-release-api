'use strict'

function getRemenderImageResult (id) {
  return {
    result: [
      {
        publisher: id,
        title: 'Low',
        url: '/comics/series/low'
      },
      {
        publisher: id,
        title: 'Deadly Class',
        url: '/comics/series/deadly-class'
      },
      {
        publisher: id,
        title: 'Crawl Space',
        url: '/comics/series/crawl-space'
      },
      {
        publisher: id,
        title: 'Popgun',
        url: '/comics/series/popgun'
      }
    ]
  }
}

function getSeriesPostObject (id) {
  return {
    publisher: id,
    title: 'Nailbiter',
    url: '/serie.html'
  }
}

function getImageSeries (id, publisher) {
  return {
    id: id,
    publisher: publisher,
    title: 'Nailbiter',
    url: '/serie.html',
    collectionsUrl: '/comics/collected-editions-archive/series/nailbiter',
    issuesUrl: '/comics/release-archive/series/nailbiter',
    collections: [],
    issues: []
  }
}

module.exports = {
  getRemenderImageResult: getRemenderImageResult,
  getSeriesPostObject: getSeriesPostObject,
  getImageSeries: getImageSeries
}
