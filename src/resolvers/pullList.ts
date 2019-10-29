import { Db } from 'mongodb';
import { some, none } from 'fp-ts/lib/Option';
import { isNil, identity, compose } from 'ramda'
import { PullList, ComicSeries } from '../types/mongo'
import { GraphQLResolver } from '../types/graphQL'
import { getOnePullList } from '../models/pullList'
import { getOnePublisher } from '../models/publisher'
import { getManyComicSeries, getOneComicSeries, getOneComicSeriesR, createComicSeries } from '../models/comicSeries'
import { crawlComicSeries } from '../services/crawler'
import { Logger } from '../types/app';
import { exec } from '../lib/exec'
import { right } from 'fp-ts/lib/Either';

interface PullListRootQuery {
  getPullList: GraphQLResolver<PullList, { owner: string }>;
}

// TODO: remove owner and instead get it from cookie/token via context
interface PullListRootMutation {
  pullSeries: GraphQLResolver<PullList, { owner: string, publisher: string, seriesUrl: string }>
}

interface PullListResolver {
  PullList: {
    list: GraphQLResolver<PullList, any>;
  };
}

export const PullListRoot: PullListRootQuery = {
  getPullList: (_, { owner }, { dependencies: { db, logger } }) => db
    .map(getOnePullList(logger, owner))
    .toNullable(),
}

export const PullListResolver: PullListResolver = {
  PullList: {
    list: ({ list }, _, { dependencies: { db, logger } }) => db
      .map(getManyComicSeries(logger, list))
      .toNullable()
    ,
  }
}

const createNewComicSeries = (logger: Logger, publisherName: string, seriesUrl: string, db: Db) => async () =>
  getOnePublisher(logger, publisherName)(db)
    .then(publisher => crawlComicSeries(publisher, seriesUrl))
    .then(eitherComicSeriesCrawl => eitherComicSeriesCrawl.chain(cs => createComicSeries(logger, { ...cs, url: seriesUrl, publisher: publisherName, collections: [], comicBooks: [] })(db)))
    .then(eitherComicSeriesPromise => eitherComicSeriesPromise.map(p => p.then(p)))


export const PullListMutation: PullListRootMutation = {
  // createPullList: async (root, { owner }) => {
  //   return await pullListService.getPullListByOwner(owner) || await pullListService.createPullList(owner)
  // },
  pullSeries: (_, { owner, publisher, seriesUrl }, { dependencies: { db, logger } }) => db
    .map(someDb =>
      getOneComicSeriesR(logger, { publisher, url: seriesUrl })
        .run(someDb)
        .then(identity)
        .then(e => e.mapLeft(createNewComicSeries(logger, publisher, seriesUrl, someDb)))
    )

  
    async(root, { owner, publisher, seriesUrl }) => {
  const series = await seriesService.getSeriesByQuery({ publisher, url: seriesUrl })
  const _id = series ? series._id : await createNewSeries(publisher, seriesUrl, DependencyFactory.getDependencies())
  return await pullListService.addSeriesToPullList(owner, _id) || await pullListService.getPullListByOwner(owner)
},
  // removeSeries: async (root, { owner, series }) => await pullListService.removeSeriesFromPullList(owner, series)
}
