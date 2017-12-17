'use strict'

import Search from './types/search'
import PullList from './types/pull-list'
import Publisher from './types/publisher'
import Series from './types/series'
import Comic from './types/comic'

const RootQuery = `
  type RootQuery {
    search(searchPhrase: String!, publishers: [String]): [Search]
    pulllists: [PullList!]!
    pulllist(owner: String!): PullList
    publishers(names: [String!]!): [Publisher!]
    publisher(name: String!): Publisher
    series(id: ID!): Series
    comic(id: ID!): Comic
  }
`

export default () => [RootQuery, Search, PullList, Publisher, Series, Comic]