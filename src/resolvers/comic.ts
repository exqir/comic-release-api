import { GraphQLTypeResolver } from 'graphql'

import { DependencyFactory } from '../../factories/dependencyFactory'
import { GraphQLContext, GraphQLResolver } from '../types/graphQL';
import { ComicBook } from '../types/mongo';

const { comicService, publisherService, seriesService } = DependencyFactory.getDependencies()

interface ComicRoot {
  getComicBook: GraphQLResolver<ComicBook, Pick<ComicBook, 'id'>>;
}

interface ComicResolver {
  Comic: {
    publisher: GraphQLTypeResolver<ComicBook, GraphQLContext>;
    series: GraphQLTypeResolver<ComicBook, GraphQLContext>;
  }
}

export const ComicRoot: ComicRoot = {
  getComicBook: async (_, { id }) => await comicService.getComicById(id)
}

export const ComicResolver: ComicResolver = {
  Comic: {
    publisher: async ({ publisher }) => await publisherService.getPublisherByName(publisher),
    series: async ({ series }) => await seriesService.getSeriesById(series),
  }
}
