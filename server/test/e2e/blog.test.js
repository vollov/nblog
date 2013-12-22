'use strict';

var request = require('supertest')
	, should = require('should')
	, redisService = require('../../lib/redis')
	, app = require('../../server').app;

describe('Test blog api/n', function() {

	var url_blog_list = '/public/blogs';
	
	describe('Test get a list of blog: GET->' + url_blog_list, function() {
		
		it('should return 4 blogs for url /public/blog', function(done) {
			request(app)
			.get(url_blog_list)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.lengthOf(4);
				res.body[0].should.have.property('title', 'blog title 4 Soft-wrapping on prose diffs');
				if (err) return done(err);
				done();
			});
		});
	});
});
