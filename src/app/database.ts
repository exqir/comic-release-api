import { Express } from 'express'
import { connect } from 'mongad'
import { some, none } from 'fp-ts/lib/Option'
import { ApplicationConfig, Logger, DependencyInjector } from '../types/app'

const connectToDb = async (
  config: ApplicationConfig,
  logger: Logger,
) => {
  return connect({ server: config.dbServer, port: config.dbPort })
    .fold(
      (err) => {
        logger.error(err.message)
        return none
      },
      client => {
        logger.log(`Connected to ${config.dbServer} on ${config.dbPort}`)
        return some(client)
      },
    )
    .run()
}

export const setupDatabase = (
  config: ApplicationConfig,
  dependencies: DependencyInjector,
) => (app: Express) => {
  const { logger } = dependencies.getDependencies()
  connectToDb(config, logger).then(
    client => dependencies.injectDependency('client', client)
  )

  return app
}
