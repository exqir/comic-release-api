import { scrap } from '../scraper/scraper'

export async function scrapIssues (id, { publisher, series }, { queueService, seriesService }) {
  const { issues } = await scrap('issues', publisher, series.issuesUrl)
  const storedUrls = await seriesService.getSeriesByIdWithIssueUrls(series._id).then(({ issues }) => issues.map(i => i.url))
  return Promise.all(
    issues
    .filter(issue => !storedUrls.includes(issue.url))
    .map(issue => ({ ...issue, series: series._id, publisher: publisher._id }))
    .map(issue => queueService.push({ job: 'scrapIssue', data: { publisher, comic: issue} }))
  )
  .then(async () => {
    await queueService.removeById(id)
  })
}