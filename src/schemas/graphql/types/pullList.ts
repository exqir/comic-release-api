import { gql } from 'apollo-server-express'

export const PullList = gql`
  extend type Query {
    getPullLists: [PullList!]!
    getPullList(owner: String!): PullList
  }

  extend type Mutation {
    createPullList(owner: String!): PullList!
    pullSeries(
      owner: String!
      publisher: String!
      seriesUrl: String!
    ): PullList!
    removeSeries(owner: String!, series: ID!): PullList!
  }

  type PullList {
    _id: ID!
    owner: String!
    list: [ComicSeries]
  }
`