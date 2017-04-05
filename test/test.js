var assert = require('assert')
var supertest = require('supertest')

var app = require('../dist/index')

describe('comic-release-api functional tests', function() {
  describe('scrap image comics', function() {
    it('returns scrapped image comics as json', function(done) {
      var testComic =
      {
        imageUrl: "https://imagecomics.com/uploads/releases/_small/RatQueens_01_CVR_A.jpg",
        url: "/comics/releases/rat-queens-1-1",
        title: "Rat Queens #1",
        release_date: "2017-03-01T00:00:00+0100"
      }

      supertest(app)
        .get('/api/v1/scrap/image')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) return done(err);
          assert.deepEqual(res.body.comics[0], testComic);
          done();
        });
    })
  })
  describe('call /scrap with non-existing publisher', function() {
    it('respond with 404er, publisher not found', function(done) {
      supertest(app)
        .get('/api/v1/scrap/failure')
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.deepEqual(res.body, {errors: ['publisher not found']});
          done();
        });
    })
  })
  describe('call /scrap with illegal parameter', function() {
    it('respond with 404', function(done) {
      supertest(app)
        .get('/api/v1/scrap/0%20OR%20id%20>%200')
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    })
  })
})
