import { RootQuery } from './rootQuery'
import { RootMutation } from './rootMutation'
import { SearchResolver } from './search'
import { PublisherResolver } from './publisher'
import { PullListResolver } from './pulllist'
import { ComicSeriesResolver } from './comicSeries'
import { ComicResolver } from './comicBook'

export const resolvers = {
  ...RootQuery,
  ...RootMutation,
  ...SearchResolver,
  ...PublisherResolver,
  ...PullListResolver,
  ...ComicSeriesResolver,
  ...ComicResolver,
}
