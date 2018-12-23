import * as supertest from 'supertest'
import { initializeApp } from '../app'
import { createDependencyMap } from '../lib/dependencies'
import { createLogger } from '../lib/logger'

const apiPath = '/test/api/'

const app = initializeApp(
  {
    port: 3000,
    path: apiPath,
    dbServer: 'localhost',
    dbName: 'test',
  },
  createDependencyMap(
    { logger: createLogger('TEST-LOGGER', 'de-DE') },
  )
)

export function query(query: string) { return { query } }
export function result(data: any) { return { data } }

export function checkHeader(
  path: string,
  header: string,
  headerValue: string,
  expectedStatus: number = 200,
): Promise<any> {
  return supertest(app)
    .get(path)
    .expect(expectedStatus)
    .expect(header, headerValue)
}

export function options(
  path: string,
  expectedStatus: number = 200,
): Promise<any> {
  return supertest(app)
    .options(path)
    .expect(expectedStatus)
}

export function get(
  path: string,
  expectedPayload: any,
  expectedStatus: number = 200,
  expectedType: RegExp = /json/,
): Promise<any> {
  return supertest(app)
    .get(path)
    .expect(expectedStatus)
    .expect('Content-Type', expectedType)
    .then(res => {
      expect(res.body).toEqual(expectedPayload)
    })
}

export function post(
  path: string,
  payload: any,
  expectedPayload: any,
  expectedStatus: number = 200,
  expectedType: RegExp = /json/,
): Promise<any> {
  return supertest(app)
    .post(path)
    .send(payload)
    .expect(expectedStatus)
    .expect('Content-Type', expectedType)
    .then(res => {
      expect(res.body).toEqual(expectedPayload)
    })
}

export function graphQLquery(
  payload: any,
  expectedPayload: any,
  expectedStatus?: number,
  expectedType?: RegExp,
) {
  return post(
    apiPath,
    payload,
    expectedPayload,
    expectedStatus,
    expectedType,
  )
}
