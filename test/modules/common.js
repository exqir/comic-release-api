import supertest from 'supertest'
import { assert } from 'chai'

import { app } from '../../index'

export function testDeepEqual(query, result) {
  return function (done) {
    supertest(app)
    .post('/api/graphql/v1/')
    .send({ query })
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      if (err) return done(err)
      assert.deepEqual(res.body.data, result)
      done()
    })
  }
}

