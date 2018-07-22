import { createComicService } from '../services/comicService'
import { Comic } from '../models/Comic'
import { createPublisherService } from '../services/publisherService'
import { Publisher } from '../models/Publisher'
import { createPullListService } from '../services/pullListService'
import { PullList } from '../models/PullList'
import { createQueueService } from '../services/queueService'
import { Queue } from '../models/Queue'
import { createSeriesService } from '../services/seriesService'
import { Series } from '../models/Series'
import { createUserService } from '../services/userService'
import { User } from '../models/User'

const dependencyMap = {
  comicService: createComicService(Comic),
  publisherService: createPublisherService(Publisher),
  pullListService: createPullListService(PullList),
  queueService: createQueueService(Queue),
  seriesService: createSeriesService(Series),
  userService: createUserService(User),
}

export const DependenciesFactory = {
  getDependencies: () => dependencyMap,
  getDependency: key => dependencyMap[key],
};
