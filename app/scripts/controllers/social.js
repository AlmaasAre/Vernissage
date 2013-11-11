'use strict';

app
  	.controller('SocialCtrl', function ($rootScope, $scope, $timeout, $http, Items) {

      var instagramElements = [];

      var newest = [];
      var random = [];

      $scope.contents = [];

      var instagramDataUrl = "https://api.instagram.com/v1/users/6805920/media/recent/?access_token=9105191.1fb234f.6c8ebcb04cad4b39b1c3e340b55d514b";

      function getImages(url, array, update) {

          $.ajax({
            dataType: "JSONP",
            url: url,
            success: function(response) {

                // console.log("DATA",response.data);

                if(response.data)
                {
                    if(!update)
                    {
                        for(var i = 0; i < response.data.length; i++) {
                            add(response.data[i], i, array);
                        }

                        $scope.$apply(function() {
                            $scope.contents = instagramElements;
                        });
                    }

                    else if(update)
                    {
                        for(var i = 0; i < $scope.contents.length; i++) {

                            response.data = shuffle(response.data);

                            updateItem($scope.contents[i], response.data[i]);
                        }

                        $scope.$apply();
                    }
                }


            },
            error: function(error) {
              console.log("ERROR!");
              console.log(error);
            }
          });

      }

      getImages(instagramDataUrl, instagramElements);


      var getTimer = setInterval(function() {

          getImages(instagramDataUrl, instagramElements, true);

      }, 15000)


      function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      };


      function add(element, i, array) {

            var info = {
                title: element.created_time * 1000,
                text: element.caption?element.caption.text:""
            }

            if(element.type === "video")
            {
                if(element.caption.text === "")
                {
                    array.push({
                        id: i,
                        url: element.videos.low_resolution.url,
                        video: true
                    });
                }

                else
                {
                    array.push({
                        id: i,
                        url: element.videos.low_resolution.url,
                        info: info,
                        video: true
                    });
                }
            }

            else
            {

                // console.log("Image " + i);

                if(element.caption && element.caption.text === "")
                {
                    array.push({
                        id: i,
                        url: element.images.low_resolution.url
                    });
                }

                else
                {
                    array.push({
                        id: i,
                        url: element.images.low_resolution.url,
                        info: info
                    });
                }
            }
      }

      function updateItem(target, source) {

            var info = {
                title: source.created_time * 1000,
                text: source.caption?source.caption.text:""
            }

            if(source.type === "video")
            {
                if(source.caption.text === "")
                {
                    target.url = source.videos.low_resolution.url;
                    target.video = true;
                }

                else
                {
                    target.url = source.videos.low_resolution.url;
                    target.info = info;
                    target.video = true;
                }
            }

            else
            {

                if(source.caption && source.caption.text === "")
                {
                    target.url = source.images.low_resolution.url;
                }

                else
                {
                    target.url = source.images.low_resolution.url;
                    target.info = info;
                }
            }
      }
  	});
