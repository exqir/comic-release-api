'use strict'

import { SearchRoot } from './search'
import { PublisherRoot } from './publisher'
import { PullListRoot } from './pulllist'

const RootQuery = {
  ...SearchRoot,
  ...PublisherRoot,
  ...PullListRoot,
}

module.exports = {
  RootQuery
}
