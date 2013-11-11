'use strict';

app
  	.controller('NewsCtrl', function ($scope) {
        
        $scope.news = [];
        $scope.newsDataUrl = "/scripts/data/news.xml";

        // $scope.getNews = function() {
        //     var jqxhr = $.get($scope.newsDataUrl, function(xml) {
        //         var tmpNews = $.xml2json(xml); 
        //         $scope.news = tmpNews.NewsPost;
        //         console.log($scope.newsw);
        //         $scope.$apply();
        //     })
        //     .fail(function(error) {
        //         alert(error);
        //     });
        // }

        // $scope.getNews();

        $scope.news = [
            {
                pretitle: "Today",
                title: "Happy birthday!",
                media: [
                    { 
                        url: "http://labs.makingwaves.com/customer/internal/employees/data/img/2x_a76a040a427077e0452dc6f3231c992ea45c462d.jpg" 
                    },
                    { 
                        url: "http://labs.makingwaves.com/customer/internal/employees/data/img/2x_d9689ef4e3c093be55308ab81e03292797468c98.jpg" 
                    }
                ]
            },
            {
                pretitle: "This week",
                title: "Three new exciting deals; BarentsWatch, UDIR and Norrøna."
            },
            {
                pretitle: "Foreign employees",
                title: "Visiting us this week",
                media: [
                    { 
                        url: "http://labs.makingwaves.com/customer/internal/employees/data/img/2x_446f77ef24dc28607f0fa64ffe99c9034fca85fd.jpg" 
                    },
                    { 
                        url: "http://labs.makingwaves.com/customer/internal/employees/data/img/2x_6b6812472bc84279dcf3d844e43b7d2e05668a95.jpg" 
                    },
                    { 
                        url: "http://labs.makingwaves.com/customer/internal/employees/data/img/2x_7ca847e71693c24674ca8c396c02a6798ebe1173.jpg" 
                    },
                    { 
                        url: "http://labs.makingwaves.com/customer/internal/employees/data/img/2x_d2d23a3c82a0659f32dd84c4df9449f8146858de.jpg" 
                    }
                ]
            },
            {
                pretitle: "Last week",
                title: "New big and important win - Optimera"
            },
            {
                pretitle: "Next thursday, 08:30",
                title: "Miniseminar EpiServer 7"
            },
        ]

    	$scope.counter = -1;
    	$scope.currentNews = $scope.news[$scope.counter];
    	$scope.newsItemLength = 20000;

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

    	var interval = setInterval(function() {
            $scope.initNews();
    	}, $scope.newsItemLength);
  	});
