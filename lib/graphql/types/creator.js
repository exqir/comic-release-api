'use strict'

import Series from './series'

const Creator = `
  type Creator {
    _id: ID!
    firstname: String
    lastname: String!
    series: [Series]
  }
`
export default () => [Creator, Series]
