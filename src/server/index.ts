import { Server } from 'http'
import { Express } from 'express'

import { ApplicationConfig, ApplicationDependencies, ApplicationInit } from '../types/app'

export async function start(
  config: ApplicationConfig,
  dependencies: ApplicationInit,
  app: (config: ApplicationConfig, dependencies: ApplicationDependencies) => Express,
): Promise<Server> {
  const { logger, db } = dependencies
  return app(config, { logger, db: await db() }).listen({ port: config.port }, () =>
    logger.log(
      `Started Comic APP on http://localhost:${config.port}${config.path}`,
    ),
  )
}
