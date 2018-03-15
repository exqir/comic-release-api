import { describe, it, before, after, done } from 'mocha'
import { assert } from 'chai'
import supertest from 'supertest'

import { app } from '../../index'

import { createMockPublisher , imageConfig } from '../mocks/publisher'

export function publishers() {
  it('should return all publishers', (done) => {
    supertest(app)
    .post('/api/graphql/v1/')
    .send({ query: `{ publishers(names: ["image"]) { 
      _id,
      name,
      iconUrl,
      url,
      baseUrl,
      searchPath,
      searchSeriesPath,
      seriesPath
     } }`})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      if (err) return done(err)
      assert.deepEqual(res.body.data, { publishers: [imageConfig]})
      done()
    })
  })
}

export function publisher() {
  it('should return given publisher', (done) => {
    supertest(app)
    .post('/api/graphql/v1/')
    .send({ query: `{ publisher(name: "image") { 
      _id,
      name,
      iconUrl,
      url,
      baseUrl,
      searchPath,
      searchSeriesPath,
      seriesPath
     } }`})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      if (err) return done(err)
      assert.deepEqual(res.body.data, { publisher: imageConfig})
      done()
    })
  })
}
