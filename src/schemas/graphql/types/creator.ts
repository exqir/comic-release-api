import { gql } from 'apollo-server-express'

export const Creator = gql`
  type Creator {
    _id: ID!
    firstname: String
    lastname: String!
    series: [Series]
  }
`
