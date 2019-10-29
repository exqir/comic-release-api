import { DataSource } from 'apollo-datasource'
import { Db } from 'mongodb'
import { Option } from 'fp-ts/lib/Option'
import { findOne, findMany, insertOne } from 'mongad'
import { ComicBook } from '../types/mongo'
import { Logger } from '../types/app';
import { logError } from '../lib/logError';
import { collection } from '../models/pullList'

export class ComicBookSource extends DataSource {
  private collection: string
  private logger: Logger
  private db: Option<Db>
  private context: any
  public constructor(logger: Logger, db: Option<Db>) {
    super()
    this.collection = 'comicBook'
    this.logger = logger
    this.db = db
  }

  public initialize({ context } = {}) {
    this.context = context
  }

  public getOne(id: string) {
    return this.db.map(db => findOne<ComicBook>(collection, { _id: id })
      .mapLeft(logError(this.context.logger))
      .run(db)
    ).toNullable()
  }

  public getMany(ids: string[]) {
    return this.db.map(db => findMany<ComicBook>(collection, { _id: { $in: ids } })
      .mapLeft(logError(this.context.logger))
      .run(db)
    ).toNullable()
  }
}