import { gql } from 'apollo-server-express'
import { DocumentNode } from 'graphql'

import { GraphQLTypeFunction } from '../../../types/graphQL'
import { Publisher } from './publisher'

const type: DocumentNode = gql`
  type Search {
    title: String!
    url: String!
    publisher: Publisher!
  }
`
export const Search: GraphQLTypeFunction = () => [type, Publisher]
