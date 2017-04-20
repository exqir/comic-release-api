const assert = require('assert')
const supertest = require('supertest')

const app = require('../index')
const mock = require('./assets/mock')

describe('comic-release-api routes', function () {
  before(function () {

  })
  describe('seach for comics', function () {
    describe('search for remender on image comics', function () {
      it('should return array of search results', function (done) {
        supertest(app)
        .get('/api/v1/search/remender?publisher=image')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err)
          assert.deepEqual(res.body, mock.remenderImageResult)
          done()
        })
      })
    })
    describe('search for non-existing publisher', function () {
      it('respond with 500, publisher not found', function (done) {
        supertest(app)
          .get('/api/v1/search/remender?publisher=imge')
          .expect(500)
          .end(function (err, res) {
            if (err) return done(err)
            assert.deepEqual(res.body, {errors: ['publisher not found']})
            done()
          })
      })
    })
    describe('search with illegal parameter', function () {
      it('respond with 500', function (done) {
        supertest(app)
          .get('/api/v1/search/remender?publisher=0%20OR%20id%20>%200')
          .expect(500)
          .end(function (err, res) {
            if (err) return done(err)
            done()
          })
      })
    })
  })
})
