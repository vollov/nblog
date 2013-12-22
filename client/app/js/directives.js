'use strict';

//demoApp.directive('demoCaller', function factory() {
//	return {
//		restrict : 'E',
//		replace : true,
//		scope : {
//			dial : '&',
//			pc: '='
//		},
//		controller : function($scope, PageService) {
//			$scope.pageService = PageService;
//		},
//		template : '<div class="pagination">' +
//			'<ul><li ng-click="dial({page:i})" ng-repeat="i in pageService.pageList(0, pc)"><a>{{i+1}}</a></li></ul>' +
//		'</div>'
//	};
//});