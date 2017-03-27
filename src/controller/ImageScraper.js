var cheerio = require('cheerio')
var request = require('request')
var Comic = require('../models/Comic').Comic

var dateformat = require('dateformat')

function image(res, html, next) {
  var $ = cheerio.load(html);
  var counter = $('.book--inline').length;
  var books = [];
  $('.book--inline').each(function(i, element){
    var book = {};
    book.imageUrl = $(element).find('.book__img a img').attr('src');
    book.url = $(element).find('.book__img a').attr('href');
    book.title = $(element).find('.book__content .book__headline a').text();
    book.release_date =
      dateformat(
        $(element).find('.book__content .book__subHead').text(),
        'isoDateTime'
    );
    next(book, function (err) {
      if(err) return console.error(err);
      books.push(book);
      --counter;
    });
  });
  if(counter === 0) {
    console.log(new Date().toString() + ': scrapped Image comics');
    res.status(200);
    res.json({comics: books});
  }
}

module.exports = {
  image: image
}
