var cool = require('cool-ascii-faces');
var express = require('express');
var router = express.Router();
var pg = require('pg');

router.get('/', returnIndexPage);
router.get('/cool', getSmiley);
router.get('/times', countToTimes);
router.get('/db', findAllFromTestTable);
router.get('/error', causeError);
// *** api routes *** //

router.get('/blobs', findAllBlobs);
router.get('/blob/:id', findBlobById);
router.post('/blobs', addBlob);
router.put('/blob/:id', updateBlob);
router.delete('/blob/:id', deleteBlob);

function returnIndexPage(request, response) {
  response.render('pages/index');
}

function getSmiley(request, response) {
  response.send("lol "+cool()+" lol");
}

function countToTimes(request, response) {
    var result = ''
    var times = process.env.TIMES || 5
    for (i=0; i < times; i++)
      result += i + ' ';
  response.send(result);
}

function findAllFromTestTable(request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
}

function causeError(request, response) {
  var a;
  console.log(a.length);
}

function findAllBlobs(request, response) {

}

function findBlobById(request, response) {
  
}
function addBlob(request, response) {
  
}

function updateBlob(request, response) {
  
}

function deleteBlob(request, response) {
  
}

module.exports = router;