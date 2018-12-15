import * as mongoose from 'mongoose'
import { Express } from 'express'
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { Task } from 'fp-ts/lib/Task'
import { Option, none, some } from 'fp-ts/lib/Option'
import { ApplicationConfig, ApplicationDependencies, Logger } from '../types/app';

interface DatabaseConfig {
  dbServer: string,
  dbName: string,
}

const connectT = ({ dbServer, dbName }: DatabaseConfig): Task<mongoose.Mongoose> =>
  new Task((): Promise<mongoose.Mongoose> =>
    mongoose.connect(`mongodb://${dbServer}:27017/${dbName}`, { useNewUrlParser: true })
      .then(
        () => mongoose)
  )


const connectTE = (config: DatabaseConfig): TaskEither<Error, mongoose.Mongoose> =>
  tryCatch(
    connectT(config).run,
    (error: Error) => error,
  )

const connectToDb = (config: DatabaseConfig, retries: number, logger: Logger): void => {
  connectTE(config)
    .run()
    .then(E => E.fold(
      err => {
        logger.error(err.message)
        if (retries > 0) connectToDb(config, retries - 1, logger)
      },
      _ => {
        logger.log(`Connected to ${config.dbName} on ${config.dbServer}`)
      }
    ))
}

export const setupDatabase = (config: ApplicationConfig, dependencies: ApplicationDependencies) => (app: Express): Express => {
  const { logger } = dependencies.getDependencies()
  connectToDb(config, 5, logger)

  return app;
}