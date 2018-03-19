import { it } from 'mocha'

import { testDeepEqual } from './common'

import { createMockPublisher , imageConfig } from '../mocks/publisher'

export function publishers() {
  it('should return all publishers', testDeepEqual(queryAllPublishers, { publishers: [imageConfig]}))
}

export function publisher() {
  it('should return given publisher', testDeepEqual(queryPublisherByName, { publisher: imageConfig}))
}

const queryAllPublishers = `{ publishers(names: ["image"]) { 
  _id,
  name,
  iconUrl,
  url,
  baseUrl,
  searchPath,
  searchSeriesPath,
  seriesPath
 } }`

 const queryPublisherByName = `{ publisher(name: "image") { 
  _id,
  name,
  iconUrl,
  url,
  baseUrl,
  searchPath,
  searchSeriesPath,
  seriesPath
 } }`
