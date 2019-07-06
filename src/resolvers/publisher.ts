import { getDb } from 'mongad'
import { Publisher } from '../types/mongo'
import { GraphQLResolver } from '../types/graphQL'
import { getOnePublisher, getManyPublishers } from '../models/publisher'

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
  getPublisher: async (_, { name }, { di, config }) => {
    const { client, logger } = di.getDependencies()
    return client.map(async mg => {
      const db = getDb(config.dbName)(mg)
      return getOnePublisher(logger, db, name)
    }).toNullable()
  },
  getPublishers: async (_, { names }, { di, config }) => {
    const { client, logger } = di.getDependencies()
    return client.map(async mg => {
      const db = getDb(config.dbName)(mg)
      return getManyPublishers(logger, db, names)
    }).toNullable()
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
