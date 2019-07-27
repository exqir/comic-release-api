import { Db, MongoError } from 'mongodb'
import { findOne, findMany } from 'mongad'
import { Publisher } from '../types/mongo'
import { Logger } from '../types/app';

export const collection = 'publishers'

const logError = (logger: Logger) => (err: MongoError): null => {
  logger.error(err.message)
  return null
}

/**
 * TODO: Abstracting this seems to crash TypeScripts
 * const func = <T>(reader: ReaderTaskEither<Db, MongoError, T>, errorFn: (MongoError) => null) =>
 * (db: Db): Promise<T | null> => reader.run(db).then(e => e.mapLeft<null>(errorFn).value)
 */
export const getOnePublisher = (logger: Logger, name: string) => (db: Db) => findOne<Publisher>(collection, { _id: name })
  .mapLeft(logError(logger))
  .run(db)
  .then(e => e.value)

export const getManyPublishers = (logger: Logger, names: string[]) => (db: Db) => findMany<Publisher>(collection, { _id: { $in: names } })
  .mapLeft(logError(logger))
  .run(db)
  .then(e => e.value)