'use strict'

import PullList from '../models/PullList'
import Series from '../models/Series'
import Publisher from '../models/Publisher'

import RootQuery from './resolver/rootQuery'
import RootMutation from './resolver/rootMutation'
import { SearchResolver } from './resolver/search'
import { PublisherResolver } from './resolver/publisher'
import { PullListResolver } from './resolver/pulllist'

const resolvers = {
  ...RootQuery,
  ...RootMutation,
  ...SearchResolver,
  ...PublisherResolver,
  ...PullListResolver,
}

export default resolvers
