'use strict';

app
  	.controller('NewsCtrl', function ($scope) {
    	$scope.news = [
	    	{
	    		date: "Today",
	    		title: "Remember to sign up for Foosball!"
	    	},
	    	{
	    		date: "Tomorrow",
	    		title: "Weekend!"
	    	},
	    	{
	    		date: "Next monday",
	    		title: "Get ready for Movember!"
	    	}
    	];

    	$scope.counter = -1;
    	$scope.currentNews = $scope.news[$scope.counter];
    	$scope.newsItemLength = 12000;

    	$scope.initNews = function() {
    		if ($scope.counter === ($scope.news.length)-1) {
    			$scope.counter = 0;
    			$scope.$apply();
    		} else {
    			$scope.counter++;
    			$scope.$apply();
    		}

    		$scope.currentNews = $scope.news[$scope.counter];
    		$scope.$apply();

    		$('.news-inner').css('margin-top', (($('.news-inner').outerHeight()/2)*-1)-35);
    	}

        $scope.initNews();

    	var si = setInterval(function() {
            $scope.initNews();
    	}, $scope.newsItemLength);
  	});
