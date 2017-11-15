'use strict'

import Series from './series'

const PullList = `
  type PullList {
    _id: ID!
    owner: String!
    list: [Series]
  }
`
export default () => [PullList, Series] 
