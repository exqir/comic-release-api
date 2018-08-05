import { scrap } from '../scraper/scraper'

// data should be a series document with populated publisher (all) and issues (_id, url, releaseDate)
export async function updateIssues(id, data, { comicService, queueService }) {
  const { series } = data
  const { issues } = await scrap('issues', series.publisher, series.issuesUrl)
  issues.map(async issue => {
    const existingIssue = series.issues.find(i => i.url === issue.url)
    if (existingIssue) {
      if (issue.releaseDate.getTime() !== existingIssue.releaseDate.getTime()) return await comicService.updateRealeaseDateOfComic(existingIssue._id, issue.releaseDate)
    } else {
      const enhancedIssue = { publisher: series.publisher._id, series: series._id, ...issue }
      logger.logMsg(`queue: add to queue ${series.title} - ${issue.title}`)
      return await queueService.push({ job: 'scrapIssue', data: { publisher: series.publisher, comic: enhancedIssue} }).catch((err) => console.log(err))
    }
  })
}