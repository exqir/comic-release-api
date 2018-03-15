import { describe, it, before, after, done } from 'mocha'
import { assert } from 'chai'
import supertest from 'supertest'

import { app } from '../../index'

import { pulllistOwner, pulllistsResult, pulllistResult } from '../mocks/pulllist'

export function pulllists() {
  it('should return all pulllists', (done) => {
    supertest(app)
    .post('/api/graphql/v1/')
    .send({ query: '{ pulllists { owner } }'})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      if (err) return done(err)
      assert.deepEqual(res.body.data, pulllistsResult)
      done()
    })
  })
}

export function pulllist() {
  it('should return pulllist of given owner', (done) => {
    supertest(app)
    .post('/api/graphql/v1/')
    .send({ query: `{ pulllist(owner: "${pulllistOwner}") { owner }}`})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      if (err) return done(err)
      assert.deepEqual(res.body.data, pulllistResult)
      done()
    })
  })
}