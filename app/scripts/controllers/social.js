'use strict';

app
  	.controller('SocialCtrl', function ($scope, $timeout, $http) {

      $scope.contents = [];

      $scope.instagramDataUrl = "https://api.instagram.com/v1/users/6805920/media/recent/?access_token=9105191.1fb234f.6c8ebcb04cad4b39b1c3e340b55d514b";
      $scope.instagramElements = [];

      $.ajax({
        dataType: "JSONP",
        url: $scope.instagramDataUrl,
        success: function(response) {
          $scope.$apply(function() {
            $scope.instagramElements = response.data;
          });

          createArray();
        },
        error: function(error) {
          console.log("ERROR!");
          console.log(error);
        }
      });

    	function createArray() {

          var grid = 4;

          var numberOfContents = grid*(grid+1);

    		  for (var i = 0; i < numberOfContents; i++) {
            
            var element = $scope.instagramElements[i];
            console.log(element);

            var info = {
              title: element.caption.created_time * 1000,
              text: element.caption.text
            }

            if (element.type === "video") {
                console.log("Video " + i);
                if (element.caption.text === "") {
                  $scope.contents.push({
                      id: i,
                      url: element.videos.low_resolution.url,
                      video: true
                  });
                  $scope.$apply();
                } else {
                  $scope.contents.push({
                      id: i,
                      url: element.videos.low_resolution.url,
                      info: info,
                      video: true
                  });
                  $scope.$apply();
                }
              } else {
                console.log("Image " + i);
                if (element.caption.text === "") {
                  $scope.contents.push({
                      id: i,
                      url: element.images.low_resolution.url
                  });
                  $scope.$apply();
                } else {
                  $scope.contents.push({
                      id: i,
                      url: element.images.low_resolution.url,
                      info: info
                  });
                  $scope.$apply();
                }
              }
    		  }
    	}

  	});
