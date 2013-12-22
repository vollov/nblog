'use strict';

describe('Test UtitltyService', function () {
	var utilityService;
	var regexList = [ '^/$','^/about$', '^/login$', '^/blog/[^/]+$' ];
	
	beforeEach(function(){
		module('clientServices');
		inject(function(UtilityService) {
			utilityService = UtilityService;
		});
	});
	
	it('should be able to check a str matches a list of regex', function() {
		expect(utilityService.match('/about', regexList)).toBe(true);
	});
	
	it('should be able to check a str does NOT match a list of regex', function() {
		expect(utilityService.match('/aboutx', regexList)).toBe(false);
	});
	
	it('should be able to check a str matches a list of regex', function() {
		expect(utilityService.match('/blog/sdff23456', regexList)).toBe(true);
	});
	
	it('should be able to check a str does NOT match a list of regex', function() {
		expect(utilityService.match('/blog/sdff23456?tid=333', regexList)).toBe(true);
	});
	
	it('should be able to check a str does NOT match a list of regex', function() {
		expect(utilityService.match('/blog/sdff23456/ssy?tid=333', regexList)).toBe(false);
	});
});