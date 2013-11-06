'use strict';

app
  	.controller('SocialCtrl', function ($scope) {

    	$scope.contents = [];

      //Create a fake and random array of contents
    	function createArray() {

          var numberOfContents = 16;

    		  for(var i = 0; i < numberOfContents; i++) {

        			if(Math.floor((Math.random()*5)+1) === 1)
        			{
        				  $scope.contents.push({
                      id:i,
                      url: 'http://www.w3schools.com/html/mov_bbb.mp4',
                      video: true
                  });
        			}

        			else
        			{
        				  $scope.contents.push({
                      id:i,
                      url: 'http://placekitten.com/320/180'
                  });
        			}
    		  }
    	}

    	createArray();

      //END fake and random array

  	});
