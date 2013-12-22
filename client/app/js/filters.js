'use strict';

//demoApp.filter('paginate', function(settings) {
//	return function(input, page) {
//		if (!input) {
//			return input;
//		}
//		return input.slice(parseInt(page
//				* settings.pageSize),
//				parseInt((page + 1)
//						* settings.pageSize));
//	}
//});
//
//demoApp.filter('forLoop', function() {
//	return function(input, start, end) {
//		console.log('start=%j, end=%j',start,end);
//		input = new Array(end - start);
//		for ( var i = 0; start < end; start++, i++) {
//			input[i] = start;
//		}
//		return input;
//	}
//});