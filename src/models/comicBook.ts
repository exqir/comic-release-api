import { Db, InsertOneWriteOpResult, MongoError } from 'mongodb'
import { head, lens, view } from 'ramda'
import { ReaderTaskEither } from 'fp-ts/lib/ReaderTaskEither'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { Task } from 'fp-ts/lib/Task'
import { left, right } from 'fp-ts/lib/Either'

interface ComicBook {
  title: string;
  issue: string;
  releaseDate: Date;
  creators: string[];
  series: string;
  publisher: string;
  coverUrl: string;
  url: string;
}

export interface ComicBookDocument extends ComicBook {
  _id: string;
}

const collectionName = 'comicBooks'

const opsLens = lens<InsertOneWriteOpResult, ComicBookDocument[], InsertOneWriteOpResult>(
  o => o.ops,
  (val, o) => ({ ...o, ops: val }),
)

function createWithDefaults(initialObject: ComicBook): ComicBook {
  return {
    ...initialObject,
    creators: initialObject.creators || [],
  }
}

function getDocumentFromInsert(i: InsertOneWriteOpResult): ComicBookDocument {
  // return compose<ComicBookDocument[], ComicBookDocument>(
  //   head,
  //   view<InsertOneWriteOpResult, ComicBookDocument[]>(opsLens, i),
  // )
  return head(view<InsertOneWriteOpResult, ComicBookDocument[]>(opsLens)(i))
}

function save(cb: ComicBook): ReaderTaskEither<Db, MongoError, InsertOneWriteOpResult> {
  return new ReaderTaskEither(db => new TaskEither(
    new Task(() => db.collection(collectionName).insertOne(cb).then(res => right(res)).catch(err => left(err)))
  ))
}

function saveAndReturnNewDocument(cb: ComicBook): ReaderTaskEither<Db, MongoError, ComicBookDocument> {
  return save(cb).map(getDocumentFromInsert)
}

export const ComicBook = {
  create: createWithDefaults,
  save: saveAndReturnNewDocument,
}
