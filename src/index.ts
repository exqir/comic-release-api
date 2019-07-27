import { start } from './server'
import { getConfig } from './app/config'
import { setupDatabase } from './app/database'
import { initializeApp } from './app'
import { createLogger } from './lib/logger'

const logger = createLogger('COMIC-SERVICE', 'de-DE')

start(
  getConfig(),
  {
    logger,
    db: async () => setupDatabase(getConfig(), logger),
  },
  initializeApp,
)
