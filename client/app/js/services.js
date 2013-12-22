'use strict';

var clientServices = angular.module('clientServices', ['ngResource']);

//var resourceRoot = 'http://localhost\\:3000';
var httpRoot = 'http://localhost:3000';

/**
 * Blog data service, with list function as public API.
 */
//clientServices.factory('Blog', function($http, SessionService){
//	var tokenid = SessionService.get('tid');
//	return {
//		getById: function(id){
//			return $http.get(httpRoot + '/public/blog/:id');
//		},
//		query: function(){
//			return $http.get(httpRoot + '/public/blogs');
//		},
//		save: function(message){
//			return $http.post(httpRoot + '/api/blog', message).
//			success(function(response,status){
//				if(status == 200){
//					console.log('blog saved: %j', response);
//				}else{
//					console.log('save error: %j', response);
//				}
//			}).
//			error(function(response,status){
//				console.log('save error: %j', response);
//			});
//		}
//	}
//});

//clientServices.factory('Blog', function($resource, SessionService) {
//	var tokenid = SessionService.get('tid');
//	return $resource(httpRoot + '/api/blog/:id', {id: '@id', tid: tokenid}, {
//		update: {method:'PUT'},
////		delete: {method:'DELETE', url: resourceRoot + '/api/blog/:id'},
////		save:   {method:'POST', url: resourceRoot + '/api/blog'},
//		query:	{method:'GET', url: httpRoot + '/public/blogs', isArray:true, params:{id: '@id'}},
//		get:	{method:'GET', url: httpRoot + '/public/blog/:id',params:{id: '@id'}}
//	});
//}); , tid: tokenid

clientServices.factory('Blog', function($resource, SessionService) {
	var tokenid = SessionService.get('tid');
	return $resource(httpRoot + '/api/blog/:id', {id: '@id'}, {
		update: {method:'PUT'},
	});
});

//////////////////////////////////////////////////////////////////////////////
//
// Utility services
//
//////////////////////////////////////////////////////////////////////////////
clientServices.factory('AuthenticationService', function($http, 
		SessionService, FlashService) {
	var cacheSession = function(value) {
		SessionService.set('tid', value);
	};

	var uncacheSession = function() {
		SessionService.unset('tid');
	};

	var loginError = function(response) {
		FlashService.set(response.message);
	};

	return {
		login : function(credentials) {
			return $http.post(httpRoot + '/public/login', credentials).
			success(function(response,status){
				if(status == 200){
					cacheSession(response.tokenid);
					FlashService.clear();
				}else{
					loginError(response);
				}
			}).
			error(function(response,status){
				loginError(response);
			});
		},
		logout : function() {
			var tokenid = SessionService.get('tid');
			var logout = $http.get(httpRoot + '/api/logout',
					{params: {tid: tokenid}});
			logout.success(uncacheSession);
			return logout;
		},
		isLoggedIn : function() {
			return !(SessionService.get('tid') == null);
		}
	};
});

clientServices.factory('SessionService', function(){
	return {
		get: function(key){
			return sessionStorage.getItem(key);
		},
		set: function(key,value){
			return sessionStorage.setItem(key, value);
		},
		unset: function(key){
			return sessionStorage.removeItem(key);
		}
	};
});

clientServices.factory("FlashService", ['$rootScope', function($rootScope) {
	return {
		set: function(message) {
			$rootScope.flash = message;
		},
		clear: function() {
			$rootScope.flash = "";
		},
		get: function(){
			return $rootScope.flash;
		}
	}
}]);

clientServices.factory('UtilityService', function(){
	return {
		match : function(str, regexList) {
			for(var i = 0; i < regexList.length; i++){
				var regex = new RegExp(regexList[i]);
				if (regex.test(str))
					return true;
			};
			return false;
		}
	};
});

//fdServices.factory('PageService', function(settings){
//	return {
//		// count number of pages with items
//		pageCount : function(itemCount) {
//			return Math.ceil(parseInt(itemCount) / parseInt(settings.pageSize));
//		},
//		// compute the numbers showed on the list
//		pageList : function(segment, pageCount) {
//			var result = new Array(pageCount);
//			for ( var i = 0; i < pageCount; i++) {
//				result[i] = segment*10 + i;
//			}
//			return result;
//		},
//		pageSize : function(){
//			return settings.pageSize;
//		}
//	};
//});

clientApp.run(function($rootScope, $location, AuthenticationService, UtilityService) {
	// url in [ '/','/about', '/login', '/blog/:id' ]
	var publicRoutes = [ '^/$','^/about$', '^/login$', '^/blog/[^/]+$' ];

	$rootScope.$on('$routeChangeStart', function(event, next, current) {
		//event.preventDefault();
		if (!UtilityService.match($location.path(), publicRoutes) && !AuthenticationService.isLoggedIn()) {
			$location.path('/login');
		}
	});
});