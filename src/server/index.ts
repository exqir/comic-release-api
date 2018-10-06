import { Server } from 'http'
import { Express } from 'express'
import { initializeApp } from '../app'
import { getConfig } from '../app/config'
import { connectToDb } from '../app/database'

export function start(): Server {
  const app: Express = initializeApp()
  const { port, path, dbServer, dbName } = getConfig()

  connectToDb({ dbServer, dbName })
  return app.listen({ port }, () => console.log(`Started Comic APP on http://localhost:${port}${path}`))
}