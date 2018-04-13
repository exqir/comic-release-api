import { describe, before, after } from 'mocha'
import mongoose from 'mongoose'

import { createMockPullList } from './mocks/pulllist'
import { createMockPublisher } from './mocks/publisher'

import { pulllists, pulllist } from './modules/pulllist'
import { publishers, publisher } from './modules/publisher'
import { search } from './modules/search';

describe('comic-release-api', function () {
  before(function (done) {
    const promises = []
    promises.push(createMockPullList())
    promises.push(createMockPublisher())
    Promise.all(promises)
    .then(() => done())
    .catch(err => getDb().db.dropDatabase(() => done(err)))
  })

  describe('pulllists', pulllists)
  describe('pulllist', pulllist)

  describe('publishers', publishers)
  describe('publisher', publisher)

  describe('search', search)

  after(function (done) {
    mongoose.connection.db.dropDatabase()
    .then(done())
  })
})
