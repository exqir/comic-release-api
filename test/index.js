import { assert } from 'chai'
const supertest = require('supertest')

const Publisher = require('../lib/models/Publisher')
const PullList = require('../lib/models/PullList')

import { app } from '../index'
import { get as getDb } from '../lib/mongo'

let mock = require('./assets/mock')

const plMock = {
  "pulllists": [
    {
      "owner": "Wynnona"
    }
  ]
}

describe('comic-release-api routes', function () {
  before(function (done) {
    new PullList({
      'owner': 'Wynnona', 'list': []
    }).save(function (err, result) {
      if(err) return done(err)
      done()
    })
  })

  describe('basic test', function () {
    it('should return array of search results', function (done) {
      supertest(app)
      .post('/api/graphql/v1/')
      .send({ query: '{ pulllists { owner }}'})
      .expect(200)
      .expect('Content-Type', /json/)
      .end(function (err, res) {
        if (err) return done(err)
        assert.deepEqual(res.body.data, plMock)
        done()
      })
    })
  })

  after(function (done) {
    getDb().db.dropDatabase(function () {
      done()
    })
  })
})

// describe('comic-release-api routes', function () {
//   before(function (done) {
//     new Publisher({
//       'name': 'image',
//       'iconUrl': 'https://imagecomics.com/assets/img/header-logo.png',
//       'url': 'https://imagecomics.com',
//       'displayName': 'Image Comics',
//       'baseUrl': 'http://localhost:8080/image',
//       'searchPath': '/search/results?keywords=',
//       'searchSeriesPath': '/search.html?',
//       'seriesPath': '/comcis/series/'
//     }).save(function (err, result) {
//       if(err) return done(err)
//       mock.imageId = result.id
//       mock.remenderImageResult = mock.getRemenderImageResult(mock.imageId)
//       done()
//     })
//   })
//   describe('seach for comics', function () {
//     describe('search for remender on image comics', function () {
//       it('should return array of search results', function (done) {
//         supertest(app)
//         .get('/api/v1/search/remender?publisher=image')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(function (err, res) {
//           if (err) return done(err)
//           assert.deepEqual(res.body, mock.remenderImageResult)
//           done()
//         })
//       })
//     })
//     describe('search for remender on any publisher', function () {
//       it('should return array of search results', function (done) {
//         supertest(app)
//         .get('/api/v1/search/remender')
//         .expect(200)
//         .expect('Content-Type', /json/)
//         .end(function (err, res) {
//           if (err) return done(err)
//           assert.deepEqual(res.body, mock.remenderImageResult)
//           done()
//         })
//       })
//     })
//     describe('search for non-existing publisher', function () {
//       it('should respond with 500, publisher not found', function (done) {
//         supertest(app)
//           .get('/api/v1/search/remender?publisher=imge')
//           .expect(500)
//           .end(function (err, res) {
//             if (err) return done(err)
//             assert.deepEqual(res.body, {error: 'no publisher given'})
//             done()
//           })
//       })
//     })
//     describe('search with illegal parameter', function () {
//       it('should respond with 500', function (done) {
//         supertest(app)
//           .get('/api/v1/search/remender?publisher=0%20OR%20id%20>%200')
//           .expect(500)
//           .end(function (err, res) {
//             if (err) return done(err)
//             done()
//           })
//       })
//     })
//   })
//   describe('pullList functions', function () {
//     describe('create new pullList', function () {
//       it('should return the newly created pullList', function (done) {
//         supertest(app)
//         .post('/api/v1/pullList')
//         .send({owner: 'testuser'})
//         .expect(200)
//         .end(function (err, res) {
//           if (err) return done(err)
//           assert.equal(res.body.result.owner, 'testuser')
//           assert.deepEqual(res.body.result.list, [])
//           done()
//         })
//       })
//     })
//     describe('get pullList', function () {
//       it('should return the pullList', function (done) {
//         supertest(app)
//         .get('/api/v1/pullList/testuser')
//         .expect(200)
//         .end(function (err, res) {
//           if (err) return done(err)
//           assert.equal(res.body.result.owner, 'testuser')
//           assert.deepEqual(res.body.result.list, [])
//           done()
//         })
//       })
//     })
//     describe('add a new series to pullList', function () {
//       it('should return updated pullList', function (done) {
//         supertest(app)
//         .post('/api/v1/pullList/testuser/series')
//         .send({series: mock.getSeriesPostObject(mock.imageId)})
//         .expect(200)
//         .end(function (err, res) {
//           if (err) return done(err)
//           assert.equal(res.body.result.list.length, 1)
//           mock.seriesId = res.body.result.list[0]
//           done()
//         })
//       })
//     })
//     describe('get all series on pullList', function () {
//       it('should return array of series', function (done) {
//         supertest(app)
//         .get('/api/v1/pullList/testuser/series')
//         .expect(200)
//         .end(function (err, res) {
//           if (err) return done(err)
//           assert.equal(res.body.result.length, 1)
//           assert.equal(res.body.result[0].title, 'Nailbiter')
//           assert.equal(res.body.result[0].url, '/serie.html')
//           done()
//         })
//       })
//     })
//     describe('add same series to differnt pullList', function () {
//       before(function (done) {
//         supertest(app)
//         .post('/api/v1/pullList')
//         .send({owner: 'testuser2'})
//         .expect(200)
//         .end(function (err, res) {
//           if (err) return done(err)
//           assert.equal(res.body.result.owner, 'testuser2')
//           assert.deepEqual(res.body.result.list, [])
//           done()
//         })
//       })
//       it('should return updated pullList', function (done) {
//         supertest(app)
//         .post('/api/v1/pullList/testuser2/series')
//         .send({series: mock.getSeriesPostObject(mock.imageId)})
//         .expect(200)
//         .end(function (err, res) {
//           if (err) return done(err)
//           assert.equal(res.body.result.list.length, 1)
//           assert.equal(res.body.result.list[0], mock.seriesId)
//           done()
//         })
//       })
//     })
//   })
//   after(function (done) {
//     app.db.connection.db.dropDatabase(function () {
//       done()
//     })
//   })
// })