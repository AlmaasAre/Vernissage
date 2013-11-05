'use strict';

app
  	.controller('SocialCtrl', function ($scope) {
    	$scope.contents = [
      		{
      			url: 'http://placekitten.com/320/180',
      			video: false
      		},
      		{
      			url: 'http://placekitten.com/320/180',
      			video: false
      		},
      		{
      			url: 'http://placekitten.com/320/180',
      			video: false
      		},
      		{
      			url: 'http://placekitten.com/320/180',
      			video: false
      		},
      		{
      			url: 'http://www.w3schools.com/html/mov_bbb.mp4',
      			video: true
      		}
    	];
  	});
