'use strict'
import { DependencyFactory } from '../../factories/dependencyFactory'
import { scrap } from '../../scraper/scraper'

const { publisherService } = DependencyFactory.getDependencies()

export const SearchRoot = {
  search: searchPhraseForPublishers,
}

export const SearchResolver = {
  Search: {
    publisher: async ({ publisher }) => await publisherService.getPublisherByName(publisher),
  }
}

async function searchPhraseForPublishers (root, { searchPhrase, publishers }) {
  const publisherArray = await publisherService.getPublishersInList(publishers)
  return await publisherArray.reduce(async (search, publisher) => {
    const { results } = await scrap('search', publisher, searchPhrase)
    const enhancedResults = results.map((result) => { 
      result.publisher = publisher
      return result
    })
    return search.concat(enhancedResults)
  }, [])
}
