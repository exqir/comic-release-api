import { Express } from 'express'

import * as authenticationController from '../controller/authentication'
import * as healthController from '../controller/health'
import * as errorController from '../controller/error'

export const setupRoutes = (app: Express): Express => {
  /**
   * ROUTES SETUP
   */
  app.get('/', authenticationController.getHome)
  app.get('/login', authenticationController.getLogin)
  app.post('/login', authenticationController.postLogin)
  app.post('/register', authenticationController.postRegister)

  /**
   * HEALTH CHECK
   */
  app.get('/.status', healthController.getStatus)

  /**
   * ERROR HANDLING
   */
  app.use(errorController.internalError)
  app.use(errorController.notFound)

  return app
}
