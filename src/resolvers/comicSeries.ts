import { ComicSeries } from '../types/mongo'
import { GraphQLResolver } from '../types/graphQL'
import { getOnePublisher } from '../models/publisher'
import { getOneComicBook, getManyComicBooks } from '../models/comicBook';

interface ComicSeriesRootQuery {
  getComicSeries: GraphQLResolver<ComicSeries, { id: string }>;
}

interface ComicSeriesResolver {
  ComicSeries: {
    comicBooks: GraphQLResolver<ComicSeries, any>;
    collections: GraphQLResolver<ComicSeries, any>;
    publisher: GraphQLResolver<ComicSeries, any>;
  };
}

export const ComicSeriesRoot: ComicSeriesRootQuery = {
  getComicSeries: async (_, { id }, { dependencies: { db, logger } }) => db
    .map(getOneComicBook(logger, id))
    .toNullable(),
}

export const ComicSeriesResolver: ComicSeriesResolver = {
  ComicSeries: {
    comicBooks: ({ comicBooks }, _, { dependencies: { db, logger } }) => db
      .map(getManyComicBooks(logger, comicBooks))
      .toNullable(),
    collections: ({ collections }, _, { dependencies: { db, logger } }) => db
      .map(getManyComicBooks(logger, collections))
      .toNullable(),
    publisher: ({ publisher }, _, { dependencies: { db, logger } }) => db
      .map(getOnePublisher(logger, publisher))
      .toNullable(),
  },
}