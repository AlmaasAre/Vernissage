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

                /*
                    Crazy jQuery stuff
                */
                // adjustImages();

                var id = attrs.id;

                var el = element[0];

                var parent = el.parentNode.parentNode;

                var video = (el.tagName === 'VIDEO');

                function show() {
                    parent.classList.add("show");
                    parent.classList.add("animate");
                }

                function hide() {
                    parent.classList.remove("show");
                }

                /*
                    Crazy jQuery stuff
                */
                function adjustImages() {
                    $('img').each(function(index) {
                        var height = $(this).height();
                        var width = $(this).width();

                        console.log(height);
                        console.log(width);

                        if (width < height) {
                            $(this).height('100%');
                            $(this).width('auto');
                        } else {
                            $(this).width('100%');
                            $(this).height('auto');
                        }
                    });
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
                            parent.classList.remove("animate");
                            Items.nextItem();
                        }, 200);
        			});
                }

                else
                {
                    if(scope.content.info)
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
                                        parent.classList.remove("animate");
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

                    else
                    {
                        console.log("Skipped image without info.");
                    }
                }


    			$rootScope.$on('Show', function(event, item) {

                     /*
                        Crazy jQuery stuff
                    */
                    // adjustImages();

                    if(item == id)
                    {
                        if(video)
                        {
                            show();

                            setTimeout(function() {
                                el.play();
                            }, 200);
                        }

                        else
                        {
                            show();

                            setTimeout(function() {
                                hide();

                                setTimeout(function() {
                                    parent.classList.remove("animate");
                                    Items.nextItem();
                                }, 200);

                            }, 8000);
                        }
                    }
    			});

                scope.$on('$destroy', function() {
                    if(video)
                    {
                        console.log('PAUSED');
                        el.stop();
                    }
                });
      		}
    	};
	});
