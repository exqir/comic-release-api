// import { ComicService } from '../services/comicService'
// import { PublisherService } from '../services/publisherService'
// import { PullListService } from '../services/pullListService'
// import { QueueService } from '../services/queueService'
// import { SeriesServices } from '../services/seriesService'
// import { UserService } from '../services/userService'

const dependencies = new Map()

// const dependencyMap = {
//   comicService: ComicService,
//   publisherService: PublisherService,
//   pullListService: PullListService,
//   queueService: QueueService,
//   seriesService: SeriesServices,
//   userService: UserService,
// }

export const DependencyFactory = {
  getDependencies: () => dependencyMap,
  getDependency: key => dependencyMap[key],
  registerDependency: (key, dependency) => dependencies.set(key, dependency)
};
