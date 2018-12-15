import { start } from './server'
import { createDependencyMap } from './lib/dependencies'
import { createLogger } from './lib/logger'
import { getConfig } from './app/config'
import { initializeApp } from './app'
import { connectToDb } from './app/database'

start(
  getConfig(),
  createDependencyMap({
    logger: createLogger('COMIC-SERVICE'),
    db: connectToDb(getConfig()),
  }),
  initializeApp,
)
