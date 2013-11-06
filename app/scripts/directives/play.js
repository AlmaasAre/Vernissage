'use strict';

app
  	.directive('play', function ($rootScope, Video) {
    	return {
    		scope: {
    			content: '='
    		},
            replace: true,
            template: '<video class="content video" ng-src="{{content.url}}" id="{{content.id}}"></video>',
      		restrict: 'E',
      		link: function postLink(scope, element, attrs) {
                var id = scope.content.id;

    			element[0].addEventListener('loadedmetadata', function() {
    				if(!Video.getPlaying())
    				{
    					// console.log("STARTED");

    					Video.setPlaying(true);
        				element[0].play();
                        Video.queueVideo(id);
    				}

    				else
    				{
    					Video.queueVideo(id);
    				}
    			});

    			element[0].addEventListener('ended', function() {
    				// console.log("ENDED");
    				Video.finished();
    			});

    			$rootScope.$on('Video', function(event, play) {
                    if(play == id)
                    {

                        element[0].play();
                    }
    			});
      		}
    	};
	});
