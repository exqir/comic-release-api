import { Express } from 'express'
import { ApolloServer, gql, Request } from 'apollo-server-express'
import { ApplicationConfig, DependencyInjector } from '../types/app'

export const setupGraphQL = (
  config: ApplicationConfig,
  dependencies: DependencyInjector,
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
      di: dependencies,
      config
    }),
  })

  server.applyMiddleware({ app, path })

  return app
}
