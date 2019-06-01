import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import { GraphQLTypeFunction } from '../../../types/graphQL'
import { ComicSeries } from './comicSeries'

const type: DocumentNode = gql`
  type PullList {
    _id: ID!
    owner: String!
    list: [ComicSeries]
  }
`
export const PullList: GraphQLTypeFunction = () => [type, ComicSeries]
