import { MongoError } from "mongodb"
import { Either } from 'fp-ts/lib/Either'

export const exec = <T>(task: Promise<Either<MongoError, T>>) =>
  task.then(e => e.value)