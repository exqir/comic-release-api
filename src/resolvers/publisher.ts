import { Publisher } from '../types/mongo'
import { GraphQLResolver } from '../types/graphQL'
import { getOnePublisher, getManyPublishers } from '../models/publisher'
import { getManyComicSeries } from '../models/comicSeries'

interface PublisherRootQuery {
  getPublisher: GraphQLResolver<Publisher, { name: string }>;
  getPublishers: GraphQLResolver<Publisher, { names: string[] }>;
}

interface PublisherResolver {
  Publisher: {
    series: GraphQLResolver<Publisher, any>;
  };
}

export const PublisherRoot: PublisherRootQuery = {
  getPublisher: (_, { name }, { dependencies: { db, logger } }) => db
    .map(getOnePublisher(logger, name))
    .toNullable(),
  getPublishers: (_, { names }, { dependencies: { db, logger } }) => db
    .map(getManyPublishers(logger, names))
    .toNullable(),
}

export const PublisherResolver: PublisherResolver = {
  Publisher: {
    series: ({ series }, _, { dependencies: { db, logger } }) => db
      .map(getManyComicSeries(logger, series))
      .toNullable(),
  },
}
