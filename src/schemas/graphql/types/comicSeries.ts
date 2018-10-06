import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import { GraphQLTypeFunction } from '../../../types/graphQL'
import { Publisher } from './publisher'
import { ComicBook } from './comicBook'

const type: DocumentNode = gql`
  type ComicSeries {
    _id: ID!
    title: String!
    url: String!
    collectionsUrl: String
    issuesUrl: String
    publisher: Publisher
    collections: [Comic]
    issues: [Comic]
  }
`
export const ComicSeries:GraphQLTypeFunction = () => [type, Publisher, ComicBook]
