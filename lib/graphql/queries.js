import PullList from './types/pull-list'

const RootQuery = `
  type RootQuery {
    pulllists: [PullList!]!
    pulllist(owner: String!): PullList
    publishers: [Publisher!]
  }
`

export default () => [RootQuery, PullList]