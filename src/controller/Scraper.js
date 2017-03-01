var cheerio = require('cheerio')
var request = require('request')

exports.image = function(req, res) {
  return request('https://imagecomics.com/comics/upcoming-releases/2017/2', function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var $ = cheerio.load(html);
      var books = [];
      $('.book--inline').each(function(i, element){
        var book = {};
        book.imageUrl = $(this).find('.book__img a img').attr('src');
        book.title = $(this).find('.book__content .book__headline a').text();
        books.push(book);
        console.log('scrapped: ' + book.title);
      });
      console.log('Scrapping Image comics finished');
      return books;
    }
  });
}
