var express = require('express')
var mongoose = require('mongoose')
var api = require('./controller/api')
var app = express()

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

app.get('/', function (req, res) {
  res.send('Hello World!')
})
//Scrap
app.get('/api/v1/scrap/all', api.scrapAll);
app.get('/api/v1/scrap/image', api.scrapImage);
//app.get('/api/v1/scrap/dc', api.scrap.dc);
//app.get('/api/v1/scrap/idw', api.scrap.idw);

app.listen(3000, function () {
  console.log('app listening on port 3000!')
})
