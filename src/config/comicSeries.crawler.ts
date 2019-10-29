import { ScrapeOptionElement } from "scrape-it";

type Selector = string | ScrapeOptionElement

interface ComicSeriesPublisherConfig {
  title: Selector;
  collectionUrl: Selector;
  singleIssuesUrl: Selector;
  [key: string]: Selector;
}

interface ComicSeriesCrawlerConfig {
  [name: string]: ComicSeriesPublisherConfig;
}

const image = {
  title: '.header__title',
  collectionUrl: {
    selector: '.section__moreLink',
    attr: 'href',
    eq: 0,
  },
  singleIssuesUrl: {
    selector: '.section__moreLink',
    attr: 'href',
    eq: 1,
  }
}

export const comicSeriesCrawlerConfig: ComicSeriesCrawlerConfig = {
  image,
}