import { ComicBook } from '../types/mongo'
import { GraphQLResolver } from '../types/graphQL'
import { getOneComicBook } from '../models/comicBook'
import { getOnePublisher } from '../models/publisher'
import { getOneComicSeries } from '../models/comicSeries'

interface ComicRootQuery {
  getComicBook: GraphQLResolver<ComicBook, { id: string }>;
}

interface ComicResolver {
  Comic: {
    publisher: GraphQLResolver<ComicBook, any>;
    series: GraphQLResolver<ComicBook, any>;
  };
}

export const ComicRoot: ComicRootQuery = {
  getComicBook: (_, { id }, { dependencies: { db, logger } }) => db
    .map(getOneComicBook(logger, id))
    .toNullable(),
}

export const ComicResolver: ComicResolver = {
  Comic: {
    publisher: ({ publisher }, _, { dependencies: { db, logger } }) => db
      .map(getOnePublisher(logger, publisher))
      .toNullable(),
    series: ({ series }, _, { dependencies: { db, logger } }) => db
      .map(getOneComicSeries(logger, series))
      .toNullable(),
  },
}
