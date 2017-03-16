var cheerio = require('cheerio')
var request = require('request')

function scrap(req, res, publisher) {
  publisher(req, res);
}

function image(req, res) {
  request('https://imagecomics.com/comics/upcoming-releases/2017/2', function (error, response, html) {
    handleError(error, response, res, function() {
      var $ = cheerio.load(html);
      req.books = [];
      $('.book--inline').each(function(i, element){
        var book = {};
        book.imageUrl = $(this).find('.book__img a img').attr('src');
        book.title = $(this).find('.book__content .book__headline a').text();
        req.books.push(book);
      });
      console.log(new Date().toString() + ' scrapped Image comics');
      res.json(req.books);
    });
  });
}

function handleError(error, response, res, next) {
  if(error) {
    console.error(new Date().toString() + ' ' + error);
    res.statusCode = 500;
    return res.json({errors: ['Could not reach publisher']});
  }
  if(!error && response.statusCode != 200) {
    console.error('status code' + response.statusCode);
    res.statusCode = 500;
    return res.json({errors: ['publisher responded with' + response.statusCode]});
  }
  next();
}

module.exports = {
  scrap: scrap,
  image: image
}
