
import RootQuery from './rootQuery'
import RootMutation from './rootMutation'
import { SearchResolver } from './search'
import { PublisherResolver } from './publisher'
import { PullListResolver } from './pulllist'
import { SeriesResolver } from './series'
import { ComicResolver } from './comic'

export const resolvers: any = {
  ...RootQuery,
  ...RootMutation,
  ...SearchResolver,
  ...PublisherResolver,
  ...PullListResolver,
  ...SeriesResolver,
  ...ComicResolver,
}