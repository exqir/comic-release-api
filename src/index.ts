import { start } from './server'
import { createDependencyMap } from './lib/dependencies'
import { createLogger } from './lib/logger'
import { getConfig } from './app/config'
import { initializeApp } from './app'

start(
  getConfig(),
  createDependencyMap({
    logger: createLogger('COMIC-SERVICE', 'de-DE'),
  }),
  initializeApp,
)
