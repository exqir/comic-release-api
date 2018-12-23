import { graphQLquery, query, result } from './utils'

describe('Basic GraphQL functionalities', () => {
  test('should respond to `GraphQL` query', () => {
    return graphQLquery(
      query(`{ hello(name: "Malte") }`),
      result({ hello: "Hello Malte" }),
    )
  })
})
