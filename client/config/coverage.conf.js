module.exports = function(config){
    config.set({
    basePath : '../',

    files : [
             'app/lib/jquery/jquery.min.js',
             'app/lib/angular/angular.js',
             'app/lib/angular/angular-*.js',
             'app/lib/underscore/underscore.min.js',
             'test/lib/angular/angular-mocks.js',
             'app/js/**/*.js',
//                      'test/unit/**/*.js',
             'test/unit/services/sessionServiceSpec.js',
             'test/unit/services/flashServiceSpec.js',
             'test/unit/services/authenticationServiceSpec.js',
             'test/unit/controllers/blogSpec.js',
    ],

    preprocessors : {
    	'app/js/**/*.js' : 'coverage'
    },
    
    reporters : ['coverage'],
    coverageReporter : {
    	type : 'html',
    	dir : 'coverage/'
    },
    autoWatch : true,
    frameworks: ['jasmine'],
//    browsers : ['Chrome'],
    browsers : ['Firefox'],
    
    plugins : [
            'karma-junit-reporter',
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-coverage'
            ],

    junitReporter : {
      outputFile: 'test_out/unit.xml',
      suite: 'unit'
    }
})}
