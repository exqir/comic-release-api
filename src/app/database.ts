import { Express } from 'express'
import { connect } from 'mongad'
import { ApplicationConfig, Logger, DependencyInjector } from '../types/app'

const connectToDb = (
  config: ApplicationConfig,
  retries: number,
  logger: Logger,
): void => {
  connect({ server: config.dbServer, port: config.dbPort })
    .run()
    .then(E =>
      E.fold(
        err => {
          logger.error(err.message)
          if (retries > 0) connectToDb(config, retries - 1, logger)
        },
        _ => {
          logger.log(`Connected to ${config.dbName} on ${config.dbServer}`)
        },
      ),
    )
}

export const setupDatabase = (
  config: ApplicationConfig,
  dependencies: DependencyInjector,
) => (app: Express): Express => {
  const { logger } = dependencies.getDependencies()
  connectToDb(config, 5, logger)

  return app
}
