var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/blobs';
var db = pgp(connectionString);


function getAllBlobs(request, response, next) {
  db.any('select * from blob')
    .then(function (data) {
      response.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all blobs'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getBlobById(request, response, next) {
  var blobID = parseInt(request.params.id);
  db.one('select * from blob where id = $1', blobID)
    .then(function (data) {
      response.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one blob.'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createBlob(request, response, next) {
	console.log("Posting: "+request.body.name+", "+ request.body.description)
	db.none('insert into blob(name, description)' +
	      'values(${name}, ${description})',
	    request.body)
	    .then(function () {
	      response.status(200)
	        .json({
	          status: 'success',
	          message: 'Inserted one blob'
	        });
	    })
	    .catch(function (err) {
	      return next(err);
	    });
}

function updateBlob(request, response, next) {
  db.none('update blob set name=$1, description=$2',
    [request.body.name, request.body.description])
    .then(function () {
      response.status(200)
        .json({
          status: 'success',
          message: 'Updated blob'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function deleteBlob(request, response, next) {
  var blobID = parseInt(request.params.id);
  db.result('delete from blob where id = $1', blobID)
    .then(function (result) {
      /* jshint ignore:start */
      response.status(200)
        .json({
          status: 'success',
          message: `Removed ${result.rowCount} blob`
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

// add query functions
module.exports = {
  getAllBlobs: getAllBlobs,
  getBlobById: getBlobById,
  createBlob: createBlob,
  updateBlob: updateBlob,
  deleteBlob: deleteBlob
};