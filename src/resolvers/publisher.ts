import { GraphQLTypeResolver } from 'graphql'
import { DependencyFactory } from '../../factories/dependencyFactory'
import { Publisher } from '../types/mongo';
import { GraphQLContext } from '../types/graphQL';

const { publisherService, seriesService } = DependencyFactory.getDependencies()

interface PublisherRoot {
  getPublishers(root: object, args: { names: Array<string> }, context: GraphQLContext): Promise<Publisher[]>;
  getPublisher(root: object, args: Pick<Publisher, 'name'>, context: GraphQLContext): Promise<Publisher>;
}

interface PublisherResolver {
  Publisher: {
    series: GraphQLTypeResolver<Publisher, GraphQLContext>;
  }
}

export const PublisherRoot: PublisherRoot = {
  getPublishers: async (_, { names }) => {
    if (names.length <= 0) return publisherService.getPublishers()
    else return publisherService.getPublishersInList(names)
  },
  getPublisher: async (_, { name }) => publisherService.getPublisherByName(name),
}

export const PublisherResolver: PublisherResolver = {
  Publisher: {
    series: async ({ series }) => seriesService.getSeriesInList(series),
  }
}
