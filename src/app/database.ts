import { connect, connection, Connection } from 'mongoose'
import { TaskEither, tryCatch } from 'fp-ts/lib/TaskEither'
import { Task } from 'fp-ts/lib/Task'

interface DatabaseConfig {
  dbServer: string,
  dbName: string,
}

const connectT = ({ dbServer, dbName }: DatabaseConfig): Task<Connection> => 
  new Task((): Promise<Connection> =>
    connect(`mongodb://${dbServer}:27017/${dbName}`, { useNewUrlParser: true }).then(
      () => connection)
    )


const connectTE = (config: DatabaseConfig): TaskEither<Error, Connection> => 
  tryCatch(
    connectT(config).run,
    (error: Error) => error,
  )

export const connectToDb = (config: DatabaseConfig): void => {
  connectTE(config)
    .run()
    .then(E => E.fold(
      err => console.error(err.message),
      _ => {
        console.log(`Connected to ${config.dbName} on ${config.dbServer}`)
      }
    ))
}