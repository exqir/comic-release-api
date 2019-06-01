import { gql } from 'apollo-server-express'

import { GraphQLTypeFunction } from '../../../types/graphQL'
import { Search } from './search'
import { PullList } from './pullList'
import { Publisher } from './publisher'
import { ComicSeries } from './comicSeries'
import { ComicBook } from './comicBook'

export const RootQuery: GraphQLTypeFunction = () => [
  gql`
    type RootQuery {
      getSearch(q: String!): [Search]
      getSearchByPublishers(q: String!, publishers: [string!]!)
      getPullLists: [PullList!]!
      getPullList(owner: String!): PullList
      getPublishers(names: [String!]!): [Publisher!]
      getPublisher(name: String!): Publisher
      getComicSeries(id: ID!): ComicSeries
      getComicBook(id: ID!): ComicBook
    }
  `,
  Search,
  PullList,
  Publisher,
  ComicSeries,
  ComicBook,
]
