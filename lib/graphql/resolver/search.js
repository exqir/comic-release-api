'use strict'

import { searchResults } from 'comic-scraper'

import { scrap } from '../../scraper/scraper'
import Publisher from '../../models/Publisher'

const SearchRoot = {
  search: searchRootResolver,
}

const SearchResolver = {
  Search: {
    publisher: async ({ publisher }) => await Publisher.findById(publisher).exec(),
  }
}

async function searchRootResolver (root, { searchPhrase, publishers }) {
  const publisherArray = await Publisher.find().where('name').in(publishers).exec()
  return await publisherArray.reduce(async (results, publisher) => {
    const { data, response } = await scrap('search', publisher, searchPhrase)
    if (response.statusCode !== 200) console.log(`publisher ${publisher.name} responded with ${repsone.statusCode}`)
    return results.concat(data.series)
  }, [])
}

module.exports = {
  SearchRoot,
  SearchResolver,
}