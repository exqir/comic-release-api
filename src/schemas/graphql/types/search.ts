import { gql } from 'apollo-server-express'

export const Search = gql`
  extend type Query {
    getSearch(q: String!): [Search]
    getSearchByPublishers(q: String!, publishers: [string!]!)
  }

  type Search {
    title: String!
    url: String!
    publisher: Publisher!
  }
`
