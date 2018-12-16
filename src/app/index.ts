import * as express from 'express'
import { compose } from 'ramda'

import { ApplicationConfig, DependencyInjector } from '../types/app'
import { setupDatabase } from './database'
import { setupCors } from './cors'
import { setupAuthentication } from './authentication'
import { setupGraphQL } from './graphQLService'
import { setupRoutes } from './routes'

export function initializeApp(config: ApplicationConfig, dependencies: DependencyInjector): express.Express {
  return compose(
    setupRoutes,
    setupGraphQL(config, dependencies),
    setupAuthentication(config, dependencies),
    setupCors,
    setupDatabase(config, dependencies),
    express,
  )()
}
