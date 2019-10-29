import * as scrapeIt from 'scrape-it'
import { Task } from 'fp-ts/lib/Task'
import { TaskEither } from 'fp-ts/lib/TaskEither'
import { left, right } from 'fp-ts/lib/Either'
import { Publisher } from '../types/mongo'
import { comicSeriesCrawlerConfig } from '../config/comicSeries.crawler'

interface ComicSeriesScrapResult {
  title: string;
  collectionUrl: string;
  singleIssuesUrl: string;
}

// TODO: move crawler config to db.
// query config only one time for multiple queries e.g. for all comic book of a series
export const crawlComicSeries = ({ name, basePath }: Publisher, seriesRoute: string) =>
  new TaskEither(
    new Task(async () => {
      try {
        const url = `${basePath}${seriesRoute}`;
        const { data, response } = await scrapeIt(url, comicSeriesCrawlerConfig[name])
        if (response.statusCode !== 200) {
          throw Error(`Failed to crawl comicSeries from ${url}: Responded with ${response.statusCode}`)
        }
        return right<Error, ComicSeriesScrapResult>(data)
      } catch (e) {
        left<Error, ComicSeriesScrapResult>(e)
      }
    })
  )