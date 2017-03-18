var cheerio = require('cheerio')
var request = require('request')
var Comic = require('../models/Comic').Comic
var config = require('../config/publisher')

var image = require('./ImageScraper')

function scrap(req, res, publisher) {
  request(config[publisher].release_url, function(error, response, html) {
    handleError(error, response, req, res, html, publisher, handleRequest);
  })
}

function handleRequest(req, res, html, publisher) {
  var $ = cheerio.load(html);
  req.books = [];
  return image[publisher](req, res, html, saveComic)
}

function saveComic(comic, callback) {
  // new Comic({
  //   title: comic.title,
  //   issue: '',
  //   release_date: new Date(),
  //   author: null,
  //   artist: null,
  //   serie: null,
  //   publisher: null,
  //   imageUrl: comic.imageUrl,
  //   imageColor: 'fffff',
  //   url: ''
  // }).save(function (err) {
  //   if(err) {
  //     console.error(new Date().toString() + ': ' + err);
  //     return callback(err);
  //   }
  //   return callback(null);
  // });
  console.log(new Date().toString() + ': ' + comic.title);
  return callback(null);
}

function handleError(error, response, req, res, html, publisher, next) {
  if(error) {
    console.error(new Date().toString() + ': ' + error);
    res.statusCode = 500;
    return res.json({errors: ['Could not reach publisher']});
  }
  if(!error && response.statusCode != 200) {
    console.error('status code' + response.statusCode);
    res.statusCode = 500;
    return res.json({errors: ['publisher responded with' + response.statusCode]});
  }
  return next(req, res, html, publisher);
}

module.exports = {
  scrap: scrap,
  image: image
}
