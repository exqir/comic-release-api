import * as supertest from 'supertest'
import { initializeApp } from '../app'

/**
 * Import globals from jest.
 */

const app = initializeApp()

export function query(query: string) { return { query } }
export function result(data: object) { return { data } }

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
) : Promise<any> {
  return supertest(app)
    .options(path)
    .expect(expectedStatus)
}

export function get(
  path: string,
  expectedPayload: object,
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
  payload: object,
  expectedPayload: object,
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