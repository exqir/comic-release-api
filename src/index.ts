import { Server } from 'http'
import { Express } from 'express'
import { initializeApp } from './app'

export function start(): Server {
  const app: Express = initializeApp()
  const port: number = parseInt(process.env.PORT) || 3000
  const path: string = process.env.APIPATH || '/api/graphql/v1/'

  return app.listen({ port }, () => console.log(`Started Comic APP on http://localhost:${port}${path}`))
}

start()
