import { post, query, result } from './utils'
import { getConfig } from '../app/config'

describe('Basic GraphQL functionalities', () => {
  const { path } = getConfig()

  test('should respond to `GraphQL` query', () => {
    return post(
      path,
      query(`{ hello(name: "Malte") }`),
      result({ hello: "Hello Malte" }),
    )
  })
})
