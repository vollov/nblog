var db = require('../lib/db.js')
	, mongojs = require('mongojs')
	, security = require('../lib/security')
	, redisService = require('../lib/redis');

module.exports = function(app) {
	
	/**
	 * Spec 1.1 get the most recent 20 blogs with GET
	 */
	app.get('/api/blog', function(req, res) {
		// order by 'date' with descendant. 
		var sort = [['date', -1]];		
		db.find('blog',{sort:sort,limit:20}, function(err, blogs) {
			if (!err) {
				var result = db.filterId(blogs);
				return res.send(result);
			} else {
				return console.log(err);
			}
		});
	});

	/**
	 * Spec 1.2 get the blog by object id with GET
	 */
	app.get('/api/blog/:id', function(req, res){
		var id = req.params.id;
		db.findOne('blog', {'_id': mongojs.ObjectId(id)}, {}, function(err, blog){
			if (!err) {
				return res.send(blog);
			} else {
				return console.log(err);
			}
		});
	});
	
	/**
	 * Spec 1.3 add a new blog with POST
	 */
	app.post('/api/blog', function(req, res){
		db.save('blog', req.body)
		res.send(req.body);
	});
	
	/**
	 * Spec 1.4 edit a blog with PUT
	 */
	app.put('/api/blog', function(req, res){
		var id = req.body._id;
		
		delete req.body['_id']
		db.update('blog',  {'_id': mongojs.ObjectId(id)}, {$set: req.body}, {upsert: false, multi:false},
			function(){
				res.send(req.body);
		});
	});
	
	/**
	 * Spec 1.5 delete a blog by object id with DELETE
	 */
	app.delete('/api/blog/:id', function(req, res){
		var id = req.params.id;
		
		db.remove('blog', {'_id': mongojs.ObjectId(id)}, function(err, message){
			if (!err) {
				res.json(true);
			} else {
				console.log(err);
				res.json(false);
			}
		});
	});
};
