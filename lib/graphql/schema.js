import { makeExecutableSchema } from 'graphql-tools'

//import queries from './queries'
//import { mutations } from './mutations'

import RootQuery from './queries'
import resolvers from './resolvers' 

const SchemaDefintion = `
  schema {
    query: RootQuery
  }
`

export default makeExecutableSchema({
  typeDefs: [SchemaDefintion, RootQuery],
  resolvers,  
})

// export default new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: queries
//   }),
//   mutations: new GraphQLObjectType({
//     name: 'Mutations',
//     fields: mutations
//   })
// })