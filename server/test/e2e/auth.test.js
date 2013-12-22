'use strict';

var request = require('supertest')
	, should = require('should')
	, redisService = require('../../lib/redis')
	, app = require('../../server').app;

describe('Test auth service', function() {
	
	var url_login = '/public/login';
	
	/////////////////////////////////////////////////////////////
	//  Login api
	/////////////////////////////////////////////////////////////
	describe('Test login api: POST->' + url_login, function() {
		
		it('should return HTTP 200 if authentication success', function(done) {
			
			var credentials = {
				username: 'mary@demo.org',
				password: 'passwd'
			}
			request(app)
			.post(url_login)
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				
				var token_id = res.body['tokenid'];
				token_id.length.should.equal(40);
				var query = [token_id, 'username'];
				redisService.hget(query, function(err, reply){
					should.not.exist(err);
					reply.should.equal('mary@demo.org');
				});
				
				redisService.remove(token_id, function(err, reply){
					should.not.exist(err);
				});
//				if (err) return done(err);
				done();
			});
		});
		
		it('should return HTTP 401 if user is not in db', function(done) {
			
			var credentials = {
				username: 'mary.li@demo.org',
				password: 'passwd'
			}
			request(app)
			.post(url_login)
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(401)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.property('message', 'user name is not existing');
				done();
			});
		});
		
		it('should return HTTP 401 if password is not correct', function(done) {
			
			var credentials = {
				username: 'mary@demo.org',
				password: 'wrongpasswd'
			}
			request(app)
			.post(url_login)
			.send(credentials)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(401)
			.end(function(err,res){
				should.not.exist(err);
				res.body.should.have.property('message', 'incorrect password');
				done();
			});
		});
	});
	
	/////////////////////////////////////////////////////////////
	//  Logout api
	/////////////////////////////////////////////////////////////
	
	var url_logout = '/api/logout';
	describe('Test logout api: GET->' + url_logout, function() {
		
		var email = 'dustin@demo.org';
		var token_id = 'f2cb3e8d653f46008272113c6c72345843902ef8';
		
		beforeEach(function(done) {
			var record = [token_id, 'email', email, 'role', 1];
			redisService.save(token_id, record, function(err, reply){
				console.log(reply.toString());
				done();
			});
		});
		
		it('should return HTTP 200 when logging out', function(done) {
			
			redisService.exists(token_id, function(err, reply){
				should.not.exist(err);
				reply.should.equal(1);
			});
			
			request(app)
			.get(url_logout + '?tid=' + token_id)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				
				res.body.should.have.property('message', 'logged out');
				
				redisService.exists(token_id, function(err, reply){
					should.not.exist(err);
					reply.should.equal(0);
				});
				done();
			});
		});
	});
	
	/////////////////////////////////////////////////////////////
	//  Settings api
	/////////////////////////////////////////////////////////////
	var url_settings = '/public/settings';
	
	describe('Test settings api: GET->' + url_settings, function() {
		it('should return settings', function(done){
			request(app)
			.get(url_settings)
			.expect('Content-Type', /json/)
			.expect('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With')
			.expect(200)
			.end(function(err,res){
				should.not.exist(err);
				
				res.body.should.have.property('pageSize', 12);
				done();
			});
		});
	});
});