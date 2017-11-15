'use strict'

import Creator from './creator' 
import Publisher from './publisher'
import Series from './series'

//TODO: Use creator model and type for creators
const Comic = `
  type Comic {
    _id: ID!
    title: String!
    issue: String
    releaseDate: String
    creators: [String]
    series: Series
    publisher: Publisher
    imageUrl: String
    imageColor: String
    url: String!
  }
`
export default () => [Comic, Creator, Publisher, Series]
