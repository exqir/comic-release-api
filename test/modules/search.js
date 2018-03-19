import { it } from 'mocha'

import { testDeepEqual } from './common'

import { searchResults } from '../mocks/search'

export function search() {
  it('should return array of search results', testDeepEqual(querySearch, searchResults))
}

const querySearch = '{ search(searchPhrase: "low", publishers: ["image"]) { publisher { _id }, title, url }}'
