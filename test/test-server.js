//run automatically in pre-commit (with the help of npm pre-commit package)

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');

var should = chai.should();
var expect = chai.expect;
chai.use(chaiHttp);

describe('Heroku test app', function() {

	it('should show a smiley /blobs GET', function(done) {
	 	chai.request(server)
		.get('/cool')
		.end(function(err, res){
	    	res.should.have.status(200);
	    	res.should.be.html;
	    	res.text.should.contain("lol");
			done();
		});
	});
	
});