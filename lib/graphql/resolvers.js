'use strict'

import RootQuery from './resolver/rootQuery'
import RootMutation from './resolver/rootMutation'
import { SearchResolver } from './resolver/search'
import { PublisherResolver } from './resolver/publisher'
import { PullListResolver } from './resolver/pulllist'
import { SeriesResolver } from './resolver/series'
import { ComicResolver } from './resolver/comic'

const resolvers = {
  ...RootQuery,
  ...RootMutation,
  ...SearchResolver,
  ...PublisherResolver,
  ...PullListResolver,
  ...SeriesResolver,
  ...ComicResolver,
}

export default resolvers
