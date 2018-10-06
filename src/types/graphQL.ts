import { DocumentNode } from 'graphql';
import { Request } from 'express';

/**
 * A function returning an Array of DocumentNodes, describing a GraphQL type.
 */
export interface GraphQLTypeFunction { ():Array<DocumentNode | GraphQLTypeFunction> }

/**
 * Context provided to all requests handled by the GraphQL server.
 */
export interface GraphQLContext { req: Request }

/**
 * 
 */
export interface GraphQLResolver<Result, Argument> { (root: object, args: Argument, context: GraphQLContext): Promise<Result>}
