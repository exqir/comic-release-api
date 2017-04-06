var cheerio = require('cheerio')
var request = require('request')
var Comic = require('../models/Comic').Comic
var config = require('../config/publisher')

var image = require('./ImageScraper').image

var publisherScraper = {
  image: image
}

function scrap(req, res) {
  var publisher = config[req.params.publisher];
  if(publisher !== undefined && publisher.release_url !== undefined) {
    request(config[req.params.publisher].release_url, function(error, response, html) {
      handleError(error, response, req, res, html, handleRequest);
    })
  } else {
    res.status(404);
    return res.json({errors: ['publisher not found']});
  }
}

function handleRequest(req, res, html) {
  var $ = cheerio.load(html);
  req.books = [];
  publisherScraper[req.params.publisher](res, html, saveComic)
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
  callback(null);
}

function handleError(error, response, req, res, html, next) {
  if(error) {
    console.error(new Date().toString() + ': ' + error);
    res.status(500);
    return res.json({errors: ['Could not reach publisher']});
  }
  if(!error && response.statusCode != 200) {
    console.error('status code' + response.statusCode);
    res.status(500);
    return res.json({errors: ['publisher responded with' + response.statusCode]});
  }
  next(req, res, html);
}

module.exports = {
  scrap: scrap,
  image: image
}
