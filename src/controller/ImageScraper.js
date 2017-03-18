var cheerio = require('cheerio')
var request = require('request')
var Comic = require('../models/Comic').Comic
var config = require('../config/publisher')

function image(req, res, html, next) {
  var $ = cheerio.load(html);
  var counter = $('.book--inline').length;
  console.log(counter);
  req.books = [];
  $('.book--inline').each(function(i, element){
    var book = {};
    book.imageUrl = $(this).find('.book__img a img').attr('src');
    book.title = $(this).find('.book__content .book__headline a').text();
    next(book, function (err) {
      if(err) return console.error(err);
      req.books.push(book);
      return --counter;
    });
  });
  if(counter === 0) {
    console.log(new Date().toString() + ': scrapped Image comics');
    res.json(req.books);
  }
}

module.exports = {
  image: image
}
