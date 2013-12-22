var redisService = require('./redis');

module.exports = {
	/**
	 * Add Access-Control-Allow-Headers in HTTP response
	 */
	header : function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Headers', 'Content-Type, X-Requested-With,x-xsrf-token');
		res.header('Access-Control-Allow-Methods', 'GET, POST, HEAD, OPTIONS');
		next();
	},
	
	/**
	 * Authentication each /api/* request with the tokenid
	 */
	authentication: function(req, res, next) {
		// console.log('in authentication');
		// check a undefined tid
		if(req.query == {} || !('tid' in req.query)){
			// console.log('in authentication, no tid');
			return res.send(401, { message : 'please login' });
		} else {
			var tokenid = req.query.tid;
			// console.log('in authentication, got tid=' + tokenid);
			redisService.exists(tokenid, function(err, reply){
				if(reply == 1) {
					// console.log('tid validation passed! tid=' + tokenid);
					// we are going to extend the expire time, if the expire 
					// is less than 60 seconds
					redisService.ttl(tokenid, function(err, reply){
						if(!err) {
							if(reply <= 60) {
								redisService.expire(tokenid, 3600, function(err, reply){
									if(err) {
										console.log(reply.toString());
									}
								});
							}
						}
					});
					

					next();
				} else {
					// console.log('tid validation failed! tid=' + tokenid);
					return res.send(401, { message : 'invalid tid' });
				}
			});
		}
	}
}
