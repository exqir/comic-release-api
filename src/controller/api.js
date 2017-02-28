var scraper = require('./Scraper')

exports.scrapAll = function(req, res) {
  scraper.all()
}

exports.scrapImage = function(req, res) {
  console.log('Scrapping Image comics');
  console.log(req);
  var response = scraper.image(req);
  return function(error, response) {
    handleResponse(error, response);
  };
}

function handleResponse(res) {
    return function(error, docs) {
        if (error) {
            console.error(error);
            return res.status(500).send('An unexpected error occured');
        }
        return res.send(docs);
    };
}
