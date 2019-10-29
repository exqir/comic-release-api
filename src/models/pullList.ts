import { Db } from 'mongodb'
import { findOne } from 'mongad'
import { PullList } from '../types/mongo'
import { Logger } from '../types/app';
import { logError } from '../lib/logError';

export const collection = 'pullLists'

/**
 * TODO: Abstracting this seems to crash TypeScripts
 * const func = <T>(reader: ReaderTaskEither<Db, MongoError, T>, errorFn: (MongoError) => null) =>
 * (db: Db): Promise<T | null> => reader.run(db).then(e => e.mapLeft<null>(errorFn).value)
 */
export const getOnePullList = (logger: Logger, owner: string) => (db: Db) => findOne<PullList>(collection, { owner })
  .mapLeft(logError(logger))
  .run(db)
  .then(e => e.value)
