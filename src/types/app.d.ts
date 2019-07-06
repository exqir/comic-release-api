import {
  ComicBookService,
  ComicSeriesService,
  CreatorService,
  PublisherService,
  PullListService,
  UserService,
} from '../services'
import { MongoClient } from 'mongodb';
import { Option } from 'fp-ts/lib/Option'

export interface ApplicationConfig {
  port: number;
  path: string;
  dbServer: string;
  dbPort: number;
  dbName: string;
}

export interface ApplicationDependencies {
  logger?: Logger;
  comicBookService: ComicBookService;
  comicSeriesService: ComicSeriesService;
  creatorService: CreatorService;
  publisherService: PublisherService;
  pullListService: PullListService;
  userService: UserService;
  client?: Option<MongoClient>;
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
