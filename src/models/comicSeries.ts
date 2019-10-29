import { Db, FilterQuery } from 'mongodb'
import { findOne, findMany, insertOne } from 'mongad'
import { ComicSeries } from '../types/mongo'
import { Logger } from '../types/app';
import { logError } from '../lib/logError';

export const collection = 'comicSeries'

/**
 * TODO: Abstracting this seems to crash TypeScripts
 * const func = <T>(reader: ReaderTaskEither<Db, MongoError, T>, errorFn: (MongoError) => null =>
 * (db: Db): Promise<T | null> => reader.run(db).then(e => e.mapLeft<null>(errorFn).value)
 */
export const getOneComicSeries = (logger: Logger, query: FilterQuery<ComicSeries>) => (db: Db) => findOne<ComicSeries>(collection, query)
  .mapLeft(logError(logger))
  .run(db)
  .then(e => e.value)

export const getManyComicSeries = (logger: Logger, ids: string[]) => (db: Db) => findMany<ComicSeries>(collection, { _id: { $in: ids } })
  .mapLeft(logError(logger))
  .run(db)
  .then(e => e.value)

export const createComicSeries = (logger: Logger, comicSeries: ComicSeries) => (db: Db) => insertOne(collection, comicSeries)
  .mapLeft(logError(logger))
  .run(db)
  .then(e => e.value)



export const getOneComicSeriesR = (logger: Logger, query: FilterQuery<ComicSeries>) => findOne<ComicSeries>(collection, query)
  .mapLeft(logError(logger))
