import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import { GraphQLTypeFunction } from '../../../types/graphQL'
import { ComicSeries } from './comicSeries'

const type: DocumentNode = gql`
  type Creator {
    _id: ID!
    firstname: String
    lastname: String!
    series: [Series]
  }
`
export const Creator:GraphQLTypeFunction = () => [type, ComicSeries]
