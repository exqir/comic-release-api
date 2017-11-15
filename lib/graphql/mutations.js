'use strict'

import PullList from './types/pull-list'
import Publisher from './types/publisher'

const RootMutation = `
  type RootMutation {
    createPullList(owner: String!): PullList!
    pullSeries(owner: String!, publisher: PublisherInput!, seriesUrl: String!): PullList!
  }
`

export default () => [RootMutation, PullList, Publisher]