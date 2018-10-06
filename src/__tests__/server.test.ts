import { get, options, checkHeader } from './utils'

describe('Basic server functionalities', () => {

  test('should set `Access-Control-Allow-Origin` header', () => {
    return checkHeader('/.status', 'Access-Control-Allow-Origin', '*')
  })

  test('should set `Access-Control-Allow-Headers` header', () => {
    return checkHeader('/.status',
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Content-Length, X-Requested-With',
    )
  })

  test('should answer `options` requests with 200', () => {
    return options('/.status')
  })

  test('should provide a status route', () => {
    return get('/.status', { status: "OK" })
  })

  test('should provide error message for unknown path', () => {
    return get('/foo', { error: 404, message: "Sorry, we don\'t know that path." }, 404)
  })
})
