'use strict'

import { SearchRoot } from './search'
import { PublisherRoot } from './publisher'
import { PullListRoot } from './pulllist'
import { SeriesRoot } from './series'
import { ComicRoot } from './comic'

const RootQuery = {
  ...SearchRoot,
  ...PublisherRoot,
  ...PullListRoot,
  ...SeriesRoot,
  ...ComicRoot,
}

module.exports = {
  RootQuery
}
