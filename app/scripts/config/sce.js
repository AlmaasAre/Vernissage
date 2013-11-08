app
    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    	$sceDelegateProvider.resourceUrlWhitelist([
    		//Allow current domain
			'self',
			//Allow W3C test video
			'http://www.w3schools.com/html/mov_bbb.mp4',
			'http://phone.makingwaves.no/adimages/**'
		]);

    }]);