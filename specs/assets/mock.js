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

module.exports = {
  getRemenderImageResult: getRemenderImageResult
}
