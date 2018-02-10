'use strict'

import PullList from './types/pull-list'
import Publisher from './types/publisher'

// @TODO: import and use PublisherInput
const RootMutation = `
  type RootMutation {
    createPullList(owner: String!): PullList!
    pullSeries(owner: String!, publisher: String!, seriesUrl: String!): PullList!
    removeSeries(owner: String!, series: ID!): PullList!
  }
`

export default () => [RootMutation, PullList, Publisher]