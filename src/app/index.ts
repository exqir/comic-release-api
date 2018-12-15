import * as express from 'express'
import { compose } from 'ramda'

import { ApplicationConfig, ApplicationDependencies } from '../types/app'
import { setupCors } from './cors'
import { setupAuthentication } from './authentication'
import { setupGraphQL } from './graphQLService'
import { setupRoutes} from './routes'

export function initializeApp(config: ApplicationConfig, dependencies: ApplicationDependencies): express.Express {
  return compose(
    setupRoutes,
    setupGraphQL(config, dependencies),
    setupAuthentication(config, dependencies),
    setupCors,
    express,
  )()
}
