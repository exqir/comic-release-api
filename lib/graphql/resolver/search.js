'use strict'

import { searchResults } from 'comic-scraper'

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
  const publisherObjects = await Publisher.find().where('name').in(publishers).exec()
  return new Promise((resolve, reject) => searchResults(publisherObjects, searchPhrase, (err, searchItems) => resolve(searchItems)))
}

module.exports = {
  SearchRoot,
  SearchResolver,
}