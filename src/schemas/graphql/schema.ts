import { gql } from 'apollo-server-express'

import { ComicBook } from './types/comicBook'
import { ComicSeries } from './types/comicSeries'
import { Creator } from './types/creator'
import { Publisher } from './types/publisher'
import { PullList } from './types/pullList'
import { Search } from './types/search'

const Query = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`

export const typeDefs = [
  Query,
  ComicBook,
  ComicSeries,
  Creator,
  Publisher,
  PullList,
  Search,
]