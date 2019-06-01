import { GraphQLResolver } from '../types/graphQL'
import { ComicBook } from '../types/mongo'

interface ComicRootQuery {
  getComicBook: GraphQLResolver<ComicBook, { id: string }>
}

interface ComicResolver {
  Comic: {
    publisher: GraphQLResolver<ComicBook, any>
    series: GraphQLResolver<ComicBook, any>
  }
}

export const ComicRoot: ComicRootQuery = {
  getComicBook: async (_, { id }, { di }) => {
    const { comicBookService } = di.getDependencies()
    return comicBookService.getById(id)
  },
}

export const ComicResolver: ComicResolver = {
  Comic: {
    publisher: async ({ publisher }, _, { di }) => {
      const { publisherService } = di.getDependencies()
      return publisherService.getById(publisher)
    },
    series: async ({ series }, _, { di }) => {
      const { comicSeriesService } = di.getDependencies()
      return comicSeriesService.getById(series)
    },
  },
}
