'use strict'

import { makeExecutableSchema } from 'graphql-tools'

import RootQuery from './queries'
import RootMutation from './mutations'
import resolvers from './resolvers' 

const SchemaDefintion = `
  schema {
    query: RootQuery
    mutation: RootMutation
  }
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefintion, RootQuery, RootMutation],
  resolvers,  
})
