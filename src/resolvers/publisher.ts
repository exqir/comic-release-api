import { Publisher } from '../types/mongo'
import { GraphQLResolver } from '../types/graphQL'

interface PublisherRootQuery {
  getPublisher: GraphQLResolver<Publisher, { name: string }>
  getPublishers: GraphQLResolver<Publisher, { names: string[] }>
}

interface PublisherResolver {
  Publisher: {
    series: GraphQLResolver<Publisher, any>
  }
}

export const PublisherRoot: PublisherRootQuery = {
  getPublisher: async (_, { name }, { di }) => {
    const { publisherService } = di.getDependencies()
    return publisherService.getById(name)
  },
  getPublishers: async (_, { names }, { di }) => {
    const { publisherService } = di.getDependencies()
    return publisherService.getByList(names)
  },
}

export const PublisherResolver: PublisherResolver = {
  Publisher: {
    series: async ({ series }, _, { di }) => {
      const { comicSeriesService } = di.getDependencies()
      comicSeriesService.getByList(series)
    },
  },
}
