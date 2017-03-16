var express = require('express')
var mongoose = require('mongoose')
var api = require('./controller/api')
var app = express()

var cheerio = require('cheerio')
var request = require('request')

var port = process.env.PORT || 3000;

//mongoose.connect('mongodb://localhost/UpComics', {user: '',pass: ''});
function connectToDatabase(url, user, pass) {
  try {
    mongoose.connect('mongodb://localhost/');
  } catch (e) {

  }
}

app.all('*', function(req, res, next) {
    // Allow cross origin requests
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
 });

 var router = express.Router();
 app.use('/api/v1', router);

 router.get('/', function(req, res) {
     res.json({ message: 'hooray! welcome to our api!' });
 });

 router.route('/scrap/image')
  .get(function(req, res) {
    request('https://imagecomics.com/comics/upcoming-releases/2017/2', function (error, response, html) {
      if (!error && response.statusCode == 200) {
       var $ = cheerio.load(html);
       req.books = [];
       $('.book--inline').each(function(i, element){
         var book = {};
         book.imageUrl = $(this).find('.book__img a img').attr('src');
         book.title = $(this).find('.book__content .book__headline a').text();
         req.books.push(book);
         console.log('scrapped: ' + book.title);
       });
       console.log('Scrapping Image comics finished');
       res.json(req.books);
     }
    })
    //res.json(req.books);
  })
 .post(function(req, res) {
 });
//Scrap
app.get('/api/v1/scrap/all', api.scrapAll);
app.get('/api/v1/scrap/image', api.scrapImage);
//app.get('/api/v1/scrap/dc', api.scrap.dc);
//app.get('/api/v1/scrap/idw', api.scrap.idw);

app.listen(port, function () {
  console.log('app listening on port 3000!')
})
