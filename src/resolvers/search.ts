import { assoc, concat } from 'ramda'

import { GraphQLResolver } from '../types/graphQL'
import { Search, Publisher } from '../types/mongo'

interface SearchRootQuery {
  getSearch: GraphQLResolver<Search, { q: string }>
  getSearchByPublishers: GraphQLResolver<
    Search,
    { q: string; publishers: string[] }
  >
}

interface SearchResolver {
  Search: {
    publisher: GraphQLResolver<Search, any>
  }
}

export const SearchRoot: SearchRootQuery = {
  getSearch: async (_, { q }, { di }) => {
    const { publisherService } = di.getDependencies()
    const publishers = await publisherService.getAll()
    return collectResults(publishers, q)
  },
  getSearchByPublishers: async (
    _,
    { q, publishers: publisherList },
    { di },
  ) => {
    const { publisherService } = di.getDependencies()
    const publishers = await publisherService.getByList(publisherList)
    return collectResults(publishers, q)
  },
}

export const SearchResolver: SearchResolver = {
  Search: {
    publisher: async ({ publisher }, _, { di }) => {
      const { publisherService } = di.getDependencies()
      return publisherService.getById(publisher)
    },
  },
}

async function collectResults(publishers: Publisher[], q: string) {
  return publishers.reduce(async (res: any, p: Publisher) => {
    const { results } = await scrap('search', p, q)
    return concat(res, results.map(r => assoc('publisher', p._id, r)))
  }, [])
}

// async function searchPhraseForPublishers(root, { q, publishers }) {
//   const publisherArray = await publisherService.getPublishersInList(publishers)
//   return await publisherArray.reduce(async (search, publisher) => {
//     const { results } = await scrap('search', publisher, searchPhrase)
//     const enhancedResults = results.map((result) => {
//       result.publisher = publisher
//       return result
//     })
//     return search.concat(enhancedResults)
//   }, [])
// }
