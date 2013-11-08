app
    .config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    	$sceDelegateProvider.resourceUrlWhitelist([
    		//Allow current domain
			'self',
			//Allow all - instagram content
			'**'
		]);

    }]);