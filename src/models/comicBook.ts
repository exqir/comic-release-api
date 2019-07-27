import { FilterQuery, Db, MongoError } from 'mongodb'
import { findOne, findMany, insertOne } from 'mongad'
import { ComicBook } from '../types/mongo'
import { Logger } from '../types/app';

export const collection = 'comicBooks'

export const findOneComicBook = (query: FilterQuery<ComicBook>) => findOne(collection, query)
export const findManyComicBooks = (query: FilterQuery<ComicBook>) => findMany(collection, query)
export const insertOneComicBook = (comicBook: ComicBook) => insertOne(collection, comicBook)

const logError = (logger: Logger) => (err: MongoError): null => {
  logger.error(err.message)
  return null
}

/**
 * TODO: Abstracting this seems to crash TypeScripts
 * const func = <T>(reader: ReaderTaskEither<Db, MongoError, T>, errorFn: (MongoError) => null) =>
 * (db: Db): Promise<T | null> => reader.run(db).then(e => e.mapLeft<null>(errorFn).value)
 */
export const getOneComicBook = (logger: Logger, id: string) => (db: Db) => findOne<ComicBook>(collection, { _id: id })
  .mapLeft(logError(logger))
  .run(db)
  .then(e => e.value)

export const getManyComicBooks = (logger: Logger, ids: string[]) => (db: Db) => findMany<ComicBook>(collection, { _id: { $in: ids } })
  .mapLeft(logError(logger))
  .run(db)
  .then(e => e.value)

export const createComicBook = (logger: Logger, comicBook: ComicBook) => (db: Db) => insertOne(collection, comicBook)
  .mapLeft(logError(logger))
  .run(db)
  .then(e => e.value)
