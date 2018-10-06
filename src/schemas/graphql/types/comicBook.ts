import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import { GraphQLTypeFunction } from '../../../types/graphQL'
import { Creator } from './creator' 
import { Publisher } from './publisher'
import { ComicSeries } from './comicSeries'

const type: DocumentNode = gql`
  type ComicBook {
    _id: ID!
    title: String!
    issue: String
    releaseDate: String
    creators: [Creator]
    series: ComicSeries
    publisher: Publisher
    coverUrl: String
    url: String!
  }
`
export const ComicBook:GraphQLTypeFunction = () => [type, Creator, Publisher, ComicSeries]
