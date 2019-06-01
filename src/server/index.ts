import { Server } from 'http'
import { Express } from 'express'

import { ApplicationConfig, DependencyInjector } from '../types/app'

export function start(
  config: ApplicationConfig,
  dependencies: DependencyInjector,
  app: (config: ApplicationConfig, dependencies: DependencyInjector) => Express,
): Server {
  const { logger } = dependencies.getDependencies()
  return app(config, dependencies).listen({ port: config.port }, () =>
    logger.log(
      `Started Comic APP on http://localhost:${config.port}${config.path}`,
    ),
  )
}
