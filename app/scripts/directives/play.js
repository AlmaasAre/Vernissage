'use strict';

app
  	.directive('play', function ($rootScope, Video) {
    	return {
    		scope: {
    			id: '@play'
    		},
      		restrict: 'A',
      		link: function postLink(scope, element, attrs) {

    			element[0].addEventListener('loadedmetadata', function() {
    				if(!Video.getPlaying())
    				{
    					console.log("STARTED");

    					Video.setPlaying(true);
        				element[0].play();
    				}

    				else
    				{
    					Video.queueVideo(id);
    				}
    			});

    			element[0].addEventListener('onended', function() {
    				console.log("ENDED");
    				Video.finished();
    			});

    			$rootScope.$on(id, function() {
    				element[0].play();
    			});
      		}
    	};
	});
