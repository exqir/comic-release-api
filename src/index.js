var express = require('express')
var mongoose = require('mongoose')
//var api = require('./controller/Middleware')
var scraper = require('./controller/Scraper')
var app = express()

var port = process.env.PORT || 3000;

//mongoose.connect('mongodb://localhost/comic-app', {user: '',pass: ''});
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

 router.route('/scrap/:publisher')
  .get(function(req, res) {
    scraper.scrap(req, res);
  })
 .post(function(req, res) {
 });
//Scrap
//app.get('/api/v1/scrap/all', api.scrapAll);

app.listen(port, function () {
  console.log('comic-release-api started \n listening on ' + port)
})

module.exports = app
