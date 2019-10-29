import { Express } from 'express'
import { ApolloServer, Request } from 'apollo-server-express'
import { ApplicationConfig, ApplicationDependencies } from '../types/app'
import { resolvers } from '../resolvers/resolvers'
import { typeDefs } from '../schemas/graphql/schema'
import { ComicBookSource } from '../datasources/ComicBookSource'

export const setupGraphQL = (
  config: ApplicationConfig,
  dependencies: ApplicationDependencies,
) => (app: Express): Express => {
  const { path } = config

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    dataSources: () => ({
      comicBook: new ComicBookSource(dependencies.logger, dependencies.db),
    }),
    context: ({ req }: { req: Request }) => ({
      req,
      ...dependencies,
      config
    }),
  })

  server.applyMiddleware({ app, path })

  return app
}
