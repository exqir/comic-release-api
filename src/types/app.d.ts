import { Db } from 'mongodb';
import { Option } from 'fp-ts/lib/Option'

export interface ApplicationConfig {
  port: number;
  path: string;
  dbServer: string;
  dbPort: number;
  dbName: string;
}

export interface ApplicationInit {
  logger: Logger;
  db: () => Promise<Option<Db>>;
}

export interface ApplicationDependencies {
  logger?: Logger;
  db?: Option<Db>;
  [name: string]: any;
}

export interface DependencyInjector {
  getDependencies: () => ApplicationDependencies;
  getDependency: (name: 'logger' | 'client' | string) => any;
  injectDependency: (name: string, dependency: any) => any;
}

export interface Logger {
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
}
