import { scrap } from '../scraper/scraper'

export async function scrapIssue (id, { publisher, comic }, { comicService, queueService, seriesService }) {
  const issue = await scrap('issue', publisher, comic.url)
  await seriesService.addIssueToSeries(
    await comicService.createComic({...comic, ...issue})
  )
  await queueService.removeById(id)
}