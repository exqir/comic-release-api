import { describe, it, before, after, done } from 'mocha'
import { assert } from 'chai'
import supertest from 'supertest'

import { app } from '../../index'

import { searchResults } from '../mocks/search'

export function search() {
  it('should return array of search results', function (done) {
    supertest(app)
    .post('/api/graphql/v1/')
    .send({ query: '{ search(searchPhrase: "low", publishers: ["image"]) { publisher { _id }, title, url }}'})
    .expect(200)
    .expect('Content-Type', /json/)
    .end(function (err, res) {
      if (err) return done(err)
      assert.deepEqual(res.body.data, searchResults)
      done()
    })
  })
}
