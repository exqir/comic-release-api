const mocks = {
  image: {
    '_id': 'image',
    'name': 'Image Comics',
    'iconUrl': 'https://imagecomics.com/assets/img/header-logo.png',
    'url': 'https://imagecomics.com',
    'baseUrl': 'http://localhost:3001/image',
    'searchPath': '/search/results?keywords=',
    'searchSeriesPath': '/search.html?',
    'seriesPath': '/comcis/series/'
  }
}

export const MockFactory = {
  getMocks: () => mocks,
  getMock: key => mocks[key],
}
