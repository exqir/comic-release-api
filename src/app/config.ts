import { getEnvVar } from '../lib'
import { ApplicationConfig } from '../types/app'

export const getConfig = (): ApplicationConfig => ({
  port: getEnvVar('PORT')
    .map(parseInt)
    .getOrElse(3000),
  path: getEnvVar('APIPATH').getOrElse('/api/'),
  dbServer: getEnvVar('DB_SERVER').getOrElse('localhost'),
  dbPort: getEnvVar('DB_PORT')
    .map(parseInt)
    .getOrElse(27017),
  dbName: getEnvVar('DB_NAME').getOrElse('dev'),
})
