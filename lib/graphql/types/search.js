'use strict'

import Publisher from './publisher'

const Search = `
  type Search {
    title: String!
    url: String!
    publisher: Publisher!
  }
`
export default () => [Search, Publisher]