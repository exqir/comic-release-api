import { describe, it, before, after, done } from 'mocha'
import { assert } from 'chai'
import supertest from 'supertest'

import { app } from '../../index'

import { pulllistOwner, pulllistsResult,
  pulllistResult, createPulllistResult, pullSeriesResult } from '../mocks/pulllist'
import { imageConfig } from '../mocks/publisher'

export function pulllists() {
  it('should return all pulllists', returnAllpulllists)
}

export function pulllist() {
  it('should return pulllist of given owner', returnPulllistOfOwner)
  it('should return owner of created pulllist', createPulllist)
  it('should contain pulled series', pullSeries)
  it('should add series only once to pulllist', pullSeries)
}

function returnAllpulllists(done) {
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
}

function returnPulllistOfOwner(done) {
  supertest(app)
  .post('/api/graphql/v1/')
  .send({ query: `{ pulllist(owner: "${pulllistOwner}") { owner }}`})
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function (err, res) {
    if (err) return done(err)
    assert.deepEqual(res.body.data, pulllistResult(pulllistOwner))
    done()
  })
}

function createPulllist(done) {
  supertest(app)
  .post('/api/graphql/v1/')
  .send({ query: `mutation { createPullList(owner: "Leonardo") { owner }}`})
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function (err, res) {
    if (err) return done(err)
    assert.deepEqual(res.body.data, createPulllistResult("Leonardo"))
    done()
  })
}

function pullSeries(done) {
  supertest(app)
  .post('/api/graphql/v1/')
  .send({ query: `mutation {
    pullSeries(owner: "${pulllistOwner}", publisher: "${imageConfig._id}", seriesUrl: "/series.html") {
      list {
        title,
        collectionsUrl,
        issuesUrl
      }
    }
  }`})
  .expect(200)
  .expect('Content-Type', /json/)
  .end(function (err, res) {
    if (err) return done(err)
    assert.deepEqual(res.body.data, pullSeriesResult("Nailbiter"))
    done()
  })
}