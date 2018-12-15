import { Option } from 'fp-ts/lib/Option'

export interface ApplicationConfig {
  port: number,
  path: string,
  dbServer: string,
  dbName: string,
}

export interface ApplicationDependencies {
  logger?: Logger,
  [name: string]: any,
}

export interface Logger {
  log: (...args: any[]) => void,
  info: (...args: any[]) => void,
  error: (...args: any[]) => void,
}
