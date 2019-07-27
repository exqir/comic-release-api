import { Express } from 'express'
import { ApolloServer, gql, Request } from 'apollo-server-express'
import { ApplicationConfig, ApplicationDependencies } from '../types/app'

export const setupGraphQL = (
  config: ApplicationConfig,
  dependencies: ApplicationDependencies,
) => (app: Express): Express => {
  const { path } = config

  const server = new ApolloServer({
    typeDefs: gql`
      type Query {
        hello(name: String!): String
      }
    `,
    resolvers: {
      Query: {
        hello: (_, { name }) => `Hello ${name}`,
      },
    },
    context: ({ req }: { req: Request }) => ({
      req,
      ...dependencies,
      config
    }),
  })

  server.applyMiddleware({ app, path })

  return app
}
