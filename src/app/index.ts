import * as express from 'express'
import { compose } from 'ramda'

import { setupCors } from './cors'
import { setupAuthentication } from './authentication'
import { setupGraphQL } from './graphQLService'
import { setupRoutes} from './routes'

export const initializeApp = compose(
  setupRoutes,
  setupGraphQL,
  setupAuthentication,
  setupCors,
  express,
)
