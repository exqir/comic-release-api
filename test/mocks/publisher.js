'use strict'

import { Publisher } from '../../lib/models/Publisher'

export async function createMockPublisher() {
  return await new Publisher(imageConfig).save()
}

export const imageConfig = {
  '_id': 'image',
  'name': 'Image Comics',
  'iconUrl': 'https://imagecomics.com/assets/img/header-logo.png',
  'url': 'https://imagecomics.com',
  'baseUrl': 'http://localhost:3001/image',
  'searchPath': '/search.html?keywords=',
  'searchSeriesPath': '/search.html?',
  'seriesPath': '/comcis/series/'
}