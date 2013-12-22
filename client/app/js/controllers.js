'use strict';

var clientControllers = angular.module('clientControllers', []);

///////////////// blog objects ///////////////////////

clientControllers.controller('BlogCtrl', function ($scope, Blog) {
//	Blog.query().success(function(response,status){
//		$scope.blogs = response;
//	});
	
	$scope.blogs = Blog.query();
//	
//	$scope.selectBlog = function(row) {
//		$scope.selectedRow = row;
//	};
//	
//	$scope.delete = function(blog, index) {
//		blog.$delete({id:blog.id});
//		$scope.blogs.splice(index, 1);
//	};
});

clientControllers.controller('BlogDetailCtrl', function ($scope, $routeParams, Blog) {
//	Blog.getById($routeParams.id).success(function(response,status){
//		$scope.blog = response;
//	});
	$scope.blog = Blog.get({
		id : $routeParams.id
	});
});
	
///////////////// Other Start///////////////////////

clientApp.controller("NavCtrl", function($scope, $location, AuthenticationService) {
	$scope.logout = function() {
		AuthenticationService.logout().success(function() {
			$location.path('/');
			//$state.go('public.home');
		});
	};
});

clientApp.controller('LoginCtrl', function ($scope, $location, $cookieStore, AuthenticationService) {
	$scope.credentials = { username: "", password: ""};
	
	$scope.login = function() {
		AuthenticationService.login($scope.credentials).success(function() {
			$location.path('/admin/blogs');
			//$state.go('admin.blogs');
		});
	};
});
