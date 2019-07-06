import { FilterQuery, Db, MongoError } from 'mongodb'
import { findOne, findMany } from 'mongad'
import { Publisher } from '../types/mongo'
import { Logger } from '../types/app';

export const collection = 'publishers'

export const findOnePublisher = (query: FilterQuery<Publisher>) => findOne(collection, query)
export const findManyPublishers = (query: FilterQuery<Publisher>) => findMany(collection, query)

const logError = (logger: Logger) => (err: MongoError): null => {
  logger.error(err.message)
  return null
}

/**
 * TODO: Abstracting this seems to crash TypeScripts
 * const func = <T>(reader: ReaderTaskEither<Db, MongoError, T>, errorFn: (MongoError) => null) =>
 * (db: Db): Promise<T | null> => reader.run(db).then(e => e.mapLeft<null>(errorFn).value)
 */
export const getOnePublisher = async (logger: Logger, db: Db, name: string) => await findOnePublisher({ _id: name })
  .run(db)
  .then(e => e.mapLeft(logError(logger)).value)

export const getManyPublishers = async (logger: Logger, db: Db, names: string[]) => await findManyPublishers({ _id: { $in: names } })
  .run(db)
  .then(e => e.mapLeft(logError(logger)).value)