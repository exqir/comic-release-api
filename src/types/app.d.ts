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

export interface DependencyInjector {
  getDependencies: () => ApplicationDependencies,
  getDependency: (name: string) => any,
  injectDependency: (name: string, dependency: any) => any,
}

export interface Logger {
  log: (...args: Array<any>) => void,
  info: (...args: Array<any>) => void,
  error: (...args: Array<any>) => void,
}
