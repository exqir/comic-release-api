import { gql } from 'apollo-server-express'

import { GraphQLTypeFunction } from '../../types/graphQL'
import { RootQuery } from './types/rootQuery'
import { RootMutation } from './types/rootMutation'

export const Schema: GraphQLTypeFunction = () => [
  gql`
    schema {
      query: RootQuery
      mutation: RootMutation
    }
  `,
  RootQuery,
  RootMutation,
]


export const typeDefs = gql`
  type Query {
    _empty: String
  }
`