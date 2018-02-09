import scrapeIt from 'scrape-it'
import { getScrapConfig } from './config'

export const scrap = async (type, publisher, param) => {
  const base = publisher.baseUrl
  let url = ''
  switch (type) {
    case 'search':
      url = `${base}${publisher.searchSeariesPath ? publisher.searchSeariesPath : publisher.searchPath }${param}`
      break
    default:
      url = `${base}${param}`
  }
  const config = getScrapConfig(publisher.name, type)
  return await scrapeIt(url, config)
}