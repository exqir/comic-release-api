'use strict'

import Series from './series'

const Publisher = `
  type Publisher {
    _id: ID!
    name: String!
    displayName: String
    iconUrl: String
    url: String
    baseUrl: String
    searchPath: String
    searchSeriesPath: String
    seriesPath: String
    series: [Series]
  }
`

const PublisherInput = `
  input PublisherInput {
    _id: ID!
    name: String!
    url: String
    baseUrl: String
    searchPath: String
    searchSeriesPath: String
    seriesPath: String
  }
`
export default () => [Publisher, PublisherInput, Series]
