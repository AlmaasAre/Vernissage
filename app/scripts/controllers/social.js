'use strict';

app
  	.controller('SocialCtrl', function ($scope) {

  		var video = {
      			url: 'http://www.w3schools.com/html/mov_bbb.mp4',
      			video: true
      		};

  		var image = {
  			url: 'http://placekitten.com/320/180'
  		};

    	$scope.contents = [];

    	function createArray() {

    		for(var i = 0; i < 25; i++) {

    			if(Math.floor((Math.random()*3)+1) === 1)
    			{
    				$scope.contents.push(video);
    			}

    			else
    			{
    				$scope.contents.push(image);
    			}
    		}

    	}

    	createArray();

    	var videoes = document.getElementsByClassName("video");

    	console.log(videoes);

    	for(var j = 0; j < videoes.length; j++) {
    		console.log("play " + j);
    		videoes[j].play();
    	}

  	});
