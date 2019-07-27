import { SearchRoot } from './search'
import { PublisherRoot } from './publisher'
import { PullListRoot } from './pulllist'
import { ComicSeriesRoot } from './comicSeries'
import { ComicRoot } from './comicBook'

export const RootQuery = {
  ...SearchRoot,
  ...PublisherRoot,
  ...PullListRoot,
  ...ComicSeriesRoot,
  ...ComicRoot,
}
