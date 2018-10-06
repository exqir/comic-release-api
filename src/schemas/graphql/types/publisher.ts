import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import { GraphQLTypeFunction } from '../../../types/graphQL'
import { ComicSeries } from './comicSeries'

// @TODO: check which of the four paths are really needed
const type: DocumentNode = gql`
  type Publisher {
    _id: String!
    name: String!
    iconUrl: String
    url: String
    basePath: String,
    seriesPath: String,
    searchPath: String,
    searchPathSeries: String,
    series: [ComicSeries]
  }
`
// @TODO: check if still needed
const input: DocumentNode = gql`
  input PublisherInput {
    _id: String!
    name: String!
    url: String
    baseUrl: String
    searchPath: String
    searchSeriesPath: String
    seriesPath: String
  }
`
export const Publisher:GraphQLTypeFunction = () => [type, input, ComicSeries]
