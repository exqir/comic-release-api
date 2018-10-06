import { Express } from 'express'
import { ApolloServer, gql } from 'apollo-server-express'
import { getConfig } from './config'

export const setupGraphQL = (app: Express): Express => {
  const { path } = getConfig()

  const server = new ApolloServer({
    typeDefs: gql`
      type Query {
        hello(name: String!): String
      }
    `,
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name}`,
      }
    }
  })

  server.applyMiddleware({ app, path })

  return app
}