import { ComicBook } from '../types/mongo'
import { GraphQLResolver } from '../types/graphQL'
import { getOnePublisher } from '../models/publisher'
import { getOneComicSeries } from '../models/comicSeries'
import { identity } from 'fp-ts/lib/function'

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
  getComicBook: (_, { id }, { dataSources }) => dataSources.comicBook
    .getOne(id)
    .then(e => e.fold(
      identity,
      err => { throw err }
    ))
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
