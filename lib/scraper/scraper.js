import scrapeIt from 'scrape-it'
import { getScrapConfig } from './config'
import Logger from '../Logger'

export const scrap = async (type, publisher, param) => {
  const url = buildUrl(type, publisher, param)
  const config = getScrapConfig(publisher._id, type)
  const { data, response } = await scrapeIt(url, config)
  if (response.statusCode !== 200) {
    Logger.logMsg(`publisher ${publisher.name} responded with ${repsone.statusCode}`)
    throw new Error('publisher could not be reached')
    return null
  }
  return data
}

function buildUrl(type, publisher, param) {
  const { baseUrl } = publisher
  switch (type) {
    case 'search':
      const { searchSeariesPath, searchPath } = publisher
      return `${baseUrl}${searchSeariesPath ? searchSeariesPath : searchPath }${param}`
      break
    default:
      return `${baseUrl}${param}`
  }
}