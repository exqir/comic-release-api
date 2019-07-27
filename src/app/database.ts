import { connect, getDb } from 'mongad'
import { some, none } from 'fp-ts/lib/Option'
import { ApplicationConfig, Logger, ApplicationDependencies } from '../types/app'

const connectToDb = (
  config: ApplicationConfig,
  logger: Logger,
) => {
  return connect({ server: config.dbServer, port: config.dbPort })
    .fold(
      err => {
        logger.error(err.message)
        return none
      },
      client => {
        logger.log(`Connected to ${config.dbServer} on ${config.dbPort}`)
        return some(client)
      },
    )
}

export const setupDatabase = (
  config: ApplicationConfig,
  { logger }: ApplicationDependencies,
) => connectToDb(config, logger)
  .run()
  .then(
    client => client.map(getDb(config.dbName))
  )
