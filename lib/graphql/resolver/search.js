'use strict'

import { scrap } from '../../scraper/scraper'
import { getPublisher, getPublishersIn } from '../../controller/publisher'

export const SearchRoot = {
  search: searchPhraseForPublishers,
}

export const SearchResolver = {
  Search: {
    publisher: async ({ publisher }) => await getPublisher(publisher),
  }
}

async function searchPhraseForPublishers (root, { searchPhrase, publishers }) {
  const publisherArray = await getPublishersIn(publishers)
  return await publisherArray.reduce(async (search, publisher) => {
    const { results } = await scrap('search', publisher, searchPhrase)
    const enhancedResults = results.map((result) => { 
      result.publisher = publisher
      return result
    })
    return search.concat(enhancedResults)
  }, [])
}
