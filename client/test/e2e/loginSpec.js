'use strict';

describe('End to end test Suit for login ', function() {

	describe('Test /login view', function() {
		beforeEach(function() {
			browser().navigateTo('/login');
		});
	
		var credentials = {
				username: 'mary.li@demo.org',
				password: 'passwd'
		};
		
		it('should render about page when user navigates to /about', function() {
			//dump(element('[ng-view] p:first'));
			expect(element('[ui-view] div form h2').text()).toMatch(/Please sign in/);
		});
		
		
		it('should be able to login with credentials, then log out', function() {
			input('credentials.username').enter('mary@demo.org');
			input('credentials.password').enter('passwd');
			element(':button').click();
			expect(element('[ui-view] div').text()).toMatch(/This is message list Page/);
			
			//logout
			element('ul.nav li:eq(2) a').click();
			expect(element('[ui-view] div').text()).toMatch(/This is Home Page/);
		});
		
	});
});
