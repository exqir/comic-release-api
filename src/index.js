var express = require('express')
var mongoose = require('mongoose')
var api = require('./controller/Middleware')
var scraper = require('./controller/Scraper')
var app = express()

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
    scraper.scrap(req, res, scraper.image);
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
