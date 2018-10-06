import { Express } from 'express'
import { ApolloServer, gql } from 'apollo-server-express'

export const setupGraphQL = (app: Express): Express => {

  const server = new ApolloServer({
    typeDefs: gql`
      type Query {
        hello: String
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello World',
      }
    }
  })

  server.applyMiddleware({ app })

  return app
}