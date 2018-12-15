import * as mongoose from 'mongoose'
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { Task } from 'fp-ts/lib/Task'
import { Option, none, some } from 'fp-ts/lib/Option'

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

export const connectToDb = (config: DatabaseConfig): Option<mongoose.Mongoose> => {
  let db = null;
  connectTE(config)
    .run()
    .then(E => E.fold(
      err => { 
        console.error(err.message)
        db = none
      },
      mongoose => {
        console.log(`Connected to ${config.dbName} on ${config.dbServer}`)
        db = some(mongoose)
      }
    ))
  return db;
}