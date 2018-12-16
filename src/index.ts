import { start } from './server'
import { createDependencyMap } from './lib/dependencies'
import { getConfig } from './app/config'
import { initializeApp } from './app'

/**
 * Dependencies
 */
import { createLogger } from './lib/logger'
import {
  createComicBookService,
  createComicSeriesService,
  createPublisherService,
  createCreatorService,
  createPullListService,
  createUserService,
} from './services'
import {
  ComicBook,
  ComicSeries,
  Publisher,
  Creator,
  PullList,
  User,
} from './schemas/database'

start(
  getConfig(),
  createDependencyMap({
    logger: createLogger('COMIC-SERVICE', 'de-DE'),
    comicBookService: createComicBookService(ComicBook),
    comicSeriesService: createComicSeriesService(ComicSeries),
    creatorService: createCreatorService(Creator),
    publisherService: createPublisherService(Publisher),
    pullListService: createPullListService(PullList),
    userService: createUserService(User),
  }),
  initializeApp,
)
