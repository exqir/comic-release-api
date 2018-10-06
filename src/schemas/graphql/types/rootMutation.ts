import { gql } from 'apollo-server-express'

import { GraphQLTypeFunction } from '../../../types/graphQL'
import { PullList } from './pullList'
import { Publisher } from './publisher'

// @TODO: import and use PublisherInput

export const RootMutation:GraphQLTypeFunction = () => [
  gql`
    type RootMutation {
      createPullList(owner: String!): PullList!
      pullSeries(owner: String!, publisher: String!, seriesUrl: String!): PullList!
      removeSeries(owner: String!, series: ID!): PullList!
      login(username: String!, password: String!): String!
      logout: Boolean!
    }
  `,
  PullList,
  Publisher
]