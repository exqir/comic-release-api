'use strict'

import Search from './types/search'
import PullList from './types/pull-list'
import Publisher from './types/publisher'

const RootQuery = `
  type RootQuery {
    search(searchPhrase: String!, publishers: [String]): [Search]
    pulllists: [PullList!]!
    pulllist(owner: String!): PullList
    publishers(names: [String!]!): [Publisher!]
    publisher(name: String!): Publisher
  }
`

export default () => [RootQuery, Search, PullList, Publisher]