'use strict';

app
  	.controller('SocialCtrl', function ($scope, $timeout) {

    	$scope.contents = [];

      // $scope.zoom = false;

      // $timeout(function() {
      //     $scope.zoom = true;
      // }, 2000);

      // var zoomed = false;

      // $scope.zoom = function($event) {
      //     $event.stopPropagation();
      //     var el = $event.target;

      //     if(!zoomed)
      //     {
      //         var rect = $event.target.getBoundingClientRect();

      //         // var left = document.width/2 - rect.left - ((el.width || el.offsetWidth-5)/2);
      //         // var top = document.height/2 - rect.top - ((el.height || el.offsetHeight)/2);

      //         var left = document.width/8;
      //         var top = document.height/8;

      //         el.setAttribute("style","-webkit-transform: scale(.9); position: fixed; z-index: 10; top: 0; left: 0; box-shadow: 5px black;");
      //         //translate("+left+"px, "+top+"px)
      //         zoomed = true;
      //     }

      //     else
      //     {
      //         el.removeAttribute("style");
      //         zoomed = false;
      //     }
      // }

      //Create a fake and random array of contents
    	function createArray() {

          var grid = 5;

          var numberOfContents = grid*grid;

    		  for(var i = 0; i < numberOfContents; i++) {

        			if(Math.floor((Math.random()*5)+1) === 1)
        			{
        				  $scope.contents.push({
                      id: i,
                      url: 'http://www.w3schools.com/html/mov_bbb.mp4',
                      video: true
                  });
        			}

        			else
        			{
        				  $scope.contents.push({
                      id: i,
                      url: 'http://placekitten.com/1280/720'
                  });
        			}
    		  }
    	}

    	createArray();

      //END fake and random array

  	});
