import { scrapIssue } from '../jobs/scrapIssue'
import { scrapIssues } from '../jobs/scrapIssues'
import { updateIssues } from '../jobs/updateIssues'

export function handleJob (dependencies) {
  return async function({ _id, job, data }) {
    switch (job) {
      case 'scrapIssue':
        await scrapIssue(_id, data, dependencies)
        break
      case 'updateIssues':
        await updateIssues(_id, data, dependencies)
        break
      default:
        await scrapIssues(_id, data, dependencies)
    }
  }
}
