'use strict';

app
	.config(function ($routeProvider) {

		$routeProvider
	  		.when('/', {
	        	templateUrl: 'views/main.html',
	    		controller: 'MainCtrl'
	  		})
	  		.when('/cv', {
	        	templateUrl: 'views/cv.html',
	    		controller: 'CvCtrl'
	  		})
	  		.when('/touchcv', {
	        	templateUrl: 'views/touchcv.html',
	    		controller: 'TouchCvCtrl'
	  		})
	  		.when('/social', {
	        	templateUrl: 'views/social.html',
	    		controller: 'SocialCtrl'
	  		})
	  		.when('/news', {
	        	templateUrl: 'views/news.html',
	    		controller: 'NewsCtrl'
	  		})
	  		.otherwise({
	    		redirectTo: '/'
	  		});
	});