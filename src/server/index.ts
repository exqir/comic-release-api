import { Server } from 'http'
import { Express } from 'express'

import { ApplicationConfig, ApplicationDependencies } from '../types/app'

export function start(
  config: ApplicationConfig,
  dependencies: ApplicationDependencies,
  app: (config: ApplicationConfig, dependencies: ApplicationDependencies) => Express
): Server {
  return app(config, dependencies).listen(
    { port: config.port },
    () => console.log(`Started Comic APP on http://localhost:${config.port}${config.path}`),
  )
}
