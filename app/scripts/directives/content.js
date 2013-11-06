'use strict';

app
  	.directive('contentDirective', function ($rootScope, $timeout, Items) {
    	return {
    		scope: {
    			content: '='
    		},
            // replace: true,
            // template: '<span><video class="content video" ng-if="content.video" ng-src="{{content.url}}" id="{{content.id}}"></video><img class="content" ng-if="!content.video" ng-src="{{content.url}}"></span>',
      		restrict: 'A',
      		link: function postLink(scope, element, attrs) {

                var id = scope.content.id;

                var el = element[0];

                var video = (el.tagName === 'VIDEO');

                function show() {
                    el.parentNode.classList.add("show");
                    el.parentNode.classList.add("animate");
                }

                function hide() {
                    el.parentNode.classList.remove("show");
                }

                if(video)
                {
        			el.addEventListener('loadedmetadata', function() {
        				if(!Items.getPlaying())
        				{
                            console.log('Video init');
        					Items.setPlaying(true);
                            show();
                            el.play();

                            Items.queueItem(id);
        				}

        				else
        				{
        					Items.queueItem(id);
        				}
        			});

                    el.addEventListener('ended', function() {
        				console.log("ENDED");

                        //Go to first frame
                        el.currentTime = 0;
                        hide();

                        setTimeout(function() {
                            el.parentNode.classList.remove("animate");
                            Items.nextItem();
                        }, 200);
        			});
                }

                else
                {
                    el.addEventListener('load', function() {

                        if(!Items.getPlaying())
                        {
                            console.log('Image init');
                            Items.setPlaying(true);
                            show();

                            Items.queueItem(id);

                            setTimeout(function() {
                                hide();

                                setTimeout(function() {
                                    el.parentNode.classList.remove("animate");
                                    Items.nextItem();
                                }, 200);

                            }, 2000);
                        }

                        else
                        {
                            Items.queueItem(id);
                        }

                    });
                }


    			$rootScope.$on('Show', function(event, item) {

                    console.log(item, id);

                    if(item == id)
                    {
                        if(video)
                        {
                            show();
                            el.play();
                        }

                        else
                        {
                            show();

                            setTimeout(function() {
                                hide();

                                setTimeout(function() {
                                    el.parentNode.classList.remove("animate");
                                    Items.nextItem();
                                }, 200);

                            }, 2000);
                        }
                    }
    			});
      		}
    	};
	});
