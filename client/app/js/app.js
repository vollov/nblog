'use strict';

var clientApp = angular.module('appModule', ['ngRoute','ngResource', 'ngCookies', 'clientServices', 'clientControllers' ]);

clientApp.config(function($routeProvider, $locationProvider) {
//	$urlRouterProvider.otherwise("/");
//	
//	$stateProvider.state('public', {
//		templateUrl : 'views/layout/public.html'
//	}).state('public.home', {
//		url : '/',
//		controller : 'BlogCtrl',
//		templateUrl : 'views/public/home.html'
//	}).state('public.about', {
//		url : '/about',
//		templateUrl : 'views/public/about.html'
//	}).state('public.blog', {
//		url : '/blog/:id',
//		controller : 'BlogDetailCtrl',
//		templateUrl : 'views/public/blog.html'
//	}).state('public.login', {
//		url : '/login',
//		controller : 'LoginCtrl',
//		templateUrl : 'views/public/login.html'
//	}).state('admin', {
//		templateUrl : 'views/layout/admin.html'
//	}).state('admin.blogs', {
//		url : '/admin/blogs',
//		controller : 'BlogCtrl',
//		templateUrl : "views/admin/blog/list.html"
//	});
	
	$routeProvider.when('/', {
		controller : 'BlogCtrl',
		templateUrl : 'views/public/home.html'
	}).when('/about', {
		templateUrl : 'views/public/about.html'
	}).when('/login', {
		controller : 'LoginCtrl',
		templateUrl : 'views/public/login.html'
	}).when('/blog/:id', {
		controller : 'BlogDetailCtrl',
		templateUrl : 'views/public/blog.html'
	}).when('/admin/blogs', {
		controller : 'BlogCtrl',
		templateUrl : "views/admin/blog/list.html"
	}).when('/500', {
		templateUrl : 'views/public/500.html'
	}).otherwise({
		redirectTo : '/'
	});
	
	$locationProvider.html5Mode(true);
});

clientApp.config(function($httpProvider) {

	var logsOutUserOn401 = function($location, $q, SessionService) {
		var success = function(response) {
			return response;
		};

		var error = function(response) {
			if (response.status === 401) {
				SessionService.unset('authenticated');
				$location.path('/login');
				return $q.reject(response);
			} else {
				return $q.reject(response);
			}
		};

		return function(promise) {
			return promise.then(success, error);
		};
	};

	$httpProvider.responseInterceptors.push(logsOutUserOn401);
});

