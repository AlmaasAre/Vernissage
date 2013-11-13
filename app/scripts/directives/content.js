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

                var parent = el.parentNode.parentNode;

                var video = (el.tagName === 'VIDEO');

                var timers = [];

                var imageShowTime = 5000;

                scope.content.ready = true;

                function show() {
                    parent.classList.add("show");
                    parent.classList.add("animate");
                }

                function hide() {
                    parent.classList.remove("show");
                }

                el.removeEventListener('change');
                el.addEventListener('change', function() {
                    scope.content.ready = false;
                });

                if(video)
                {
                    el.removeEventListener('loadedmetadata');
        			el.addEventListener('loadedmetadata', function() {

                        Items.readyItem(id);

                        // if(!Items.getPlaying())
                        // {
                        //     console.log('Video init');
                        //     Items.setPlaying(true);
                        //     show();
                        //     el.play();
                        // }

        			});
                    el.removeEventListener('ended');
                    el.addEventListener('ended', function() {
        				console.log("ENDED");

                        //Go to first frame
                        el.currentTime = 0;
                        hide();

                        var t1 = setTimeout(function() {
                            parent.classList.remove("animate");

                            Items.nextItem();

                        }, 200);

                        timers.push(t1);
        			});
                }

                else
                {
                    if(scope.content.info)
                    {
                        el.removeEventListener('load');
                        el.addEventListener('load', function() {

                            Items.readyItem(id);

                            // if(!Items.getPlaying())
                            // {
                            //     console.log('Image init');
                            //     Items.setPlaying(true);
                            //     show();

                            //     var t2 = setTimeout(function() {
                            //         hide();

                            //         var t3 = setTimeout(function() {
                            //             parent.classList.remove("animate");
                            //             Items.nextItem();
                            //         }, 200);

                            //         timers.push(t3);

                            //     }, imageShowTime);

                            //     timers.push(t2);
                            // }

                        });
                    }

                    else
                    {
                        console.log("Skipped image without info.");
                    }
                }

                var onShow, onDestroy, onNextPage, onRestart;

                function showItemInfo(event, item) {

                    if(item === scope.content.id)
                    {
                        console.log("MATCH "+scope.content.id, scope.content.url);

                        if(video)
                        {
                            console.log("PLAY");

                            show();

                            var t4 = setTimeout(function() {
                                el.play();
                            }, 200);

                            timers.push(t4);
                        }

                        else
                        {
                            show();

                            var t5 = setTimeout(function() {
                                hide();

                                var t6 = setTimeout(function() {
                                    parent.classList.remove("animate");

                                    Items.nextItem();

                                }, 200);

                                timers.push(t6);

                            }, imageShowTime);

                            timers.push(t5);
                        }
                    }
                }

                if(!onNextPage)
                {
                    onNextPage = scope.$on('NextPage', function(event, item) {
                        setTimeout(function() {
                            showItemInfo(event, item);
                        }, 1000);
                    });
                }

                if(!onRestart)
                {
                    onRestart = scope.$on('Restart', function(event, item) {
                        setTimeout(function() {
                            showItemInfo(event, item);
                        }, 2000);
                    });
                }

                if(!onShow)
                {
                    // console.log("LISTEN "+scope.content.id);

                    onShow = $rootScope.$on('Show', function(event, item) {
                        showItemInfo(event, item);
                    });
                }

                function clearTimers() {
                    //Stop all timers
                    for(var i = 0; i < timers.length; i++) {

                        // console.log("Clear: " + timers[i]);

                        clearTimeout(timers[i]);
                    }
                }

                function stopEverything() {

                    console.log("stopEverything");

                    if(video)
                    {
                        console.log('PAUSED');
                        el.pause();
                    }
                }

                if(!onDestroy)
                {
                    onDestroy = scope.$on('$destroy', stopEverything);
                }
            }
    	};
	});
