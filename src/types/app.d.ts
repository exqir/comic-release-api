import {
  ComicBookService,
  ComicSeriesService,
  CreatorService,
  PublisherService,
  PullListService,
  UserService,
} from '../services'

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
  [name: string]: any;
}

export interface DependencyInjector {
  getDependencies: () => ApplicationDependencies;
  getDependency: (name: string) => any;
  injectDependency: (name: string, dependency: any) => any;
}

export interface Logger {
  log: (...args: any[]) => void;
  info: (...args: any[]) => void;
  error: (...args: any[]) => void;
}
