'use strict'

import Publisher from './publisher'
import Comic from './comic'

const Series = `
  type Series {
    _id: ID!
    title: String!
    url: String!
    collectionsUrl: String
    issuesUrl: String
    publisher: Publisher
    collections: [Comic]
    issues: [Comic]
  }
`
export default () => [Series, Publisher, Comic]
