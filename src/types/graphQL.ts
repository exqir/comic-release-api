import { GraphQLFieldResolver } from 'graphql'
import { Request } from 'express'
import { ApplicationConfig, ApplicationDependencies } from './app'

/**
 * Context provided to all requests handled by the GraphQL server.
 */
export interface GraphQLContext {
  req: Request;
  dependencies: ApplicationDependencies;
  config: ApplicationConfig;
}

/**
 *
 */
export type GraphQLResolver<Source, Argument> = GraphQLFieldResolver<
  Source,
  GraphQLContext,
  Argument
>
