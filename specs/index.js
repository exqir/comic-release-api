const assert = require('assert')
const supertest = require('supertest')

const Publisher = require('../lib/models/Publisher')
const PullList = require('../lib/models/PullList')

const app = require('../index')
const mock = require('./assets/mock')

describe('comic-release-api routes', function () {
  before(function (done) {
    new Publisher({
      'name': 'image',
      'iconUrl': 'https://imagecomics.com/assets/img/header-logo.png',
      'url': 'https://imagecomics.com',
      'displayName': 'Image Comics',
      'baseUrl': 'http://localhost:8080/image',
      'searchPath': '/search/results?keywords=',
      'searchSeriesPath': '/search.html?',
      'seriesPath': '/comcis/series/'
    }).save(function (err, result) {
      if(err) return done(err)
      mock.remenderImageResult = mock.getRemenderImageResult(result.id)
      done()
    })
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
    describe('search for remender on any publisher', function () {
      it('should return array of search results', function (done) {
        supertest(app)
        .get('/api/v1/search/remender')
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
      it('should respond with 500, publisher not found', function (done) {
        supertest(app)
          .get('/api/v1/search/remender?publisher=imge')
          .expect(500)
          .end(function (err, res) {
            if (err) return done(err)
            assert.deepEqual(res.body, {error: 'no publisher given'})
            done()
          })
      })
    })
    describe('search with illegal parameter', function () {
      it('should respond with 500', function (done) {
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
  describe('pullList', function () {
    describe('create new pullList', function () {
      it('should return the newly created pullList', function (done) {
        supertest(app)
        .post('/api/v1/pullList')
        .send({owner: 'testuser'})
        .expect(200)
        .end(function (err, res) {
          if (err) return done(err)
          assert.deepEqual(res.body, {result: {owner: 'testuser', list: []}})
          done()
        })
      })
    })
  })
  after(function () {
    Publisher.collection.drop()
    // TODO async 
    PullList.collection.drop()
  })
})
