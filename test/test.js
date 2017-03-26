var assert = require('assert')
var supertest = require('supertest')

var app = require('../dist/index')

describe('comic-release-api functional tests', function() {
  describe('scrap image comics', function() {
    it('returns scrapped image comics as json', function() {
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
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          assert.equal(res.body.comics[0], testComic);
          done();
        });
    })
  })
})
