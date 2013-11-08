'use strict';

app
  	.controller('SocialCtrl', function ($scope, $timeout, $http) {

      var instagramElements = [];

      var newest = [];
      var random = [];

      $scope.contents = [];

      var instagramDataUrl = "https://api.instagram.com/v1/users/6805920/media/recent/?access_token=9105191.1fb234f.6c8ebcb04cad4b39b1c3e340b55d514b";

      (function getImages(url, array, update) {

          $.ajax({
            dataType: "JSONP",
            url: url,
            success: function(response) {

                console.log("DATA",response.data);

                if(response.data)
                {
                    for(var i = 0; i < response.data.length; i++) {
                        add(response.data[i], i, array);
                    }

                    console.log(array);

                    if(!update)
                    {
                        fillArray(array);
                    }

                    else
                    {
                        updateRandom();
                    }

                    if(response.pagination.next_url)
                    {
                        setTimeout(function() {
                            console.log("GET MORE");
                            getImages(response.pagination.next_url, random, true);
                        }, 15000);
                    }
                }



              // prioritize();
              // fillArray();

              // var tmp = [];

              // for(var i = 0; i < $scope.contents.length; i++) {
              //     tmp.push($scope.contents[i]);
              // }

              // randomize(tmp);

              // $scope.$apply(function() {
              //     $scope.contents = tmp;
              // });

              // var t1 = setInterval(function() {
              //     cleanArray();
              //     fillArray();

              //     var tmp = [];

              //     for(var i = 0; i < $scope.contents.length; i++) {
              //         tmp.push($scope.contents[i]);
              //     }

              //     randomize(tmp);

              //     $scope.$apply(function() {
              //         $scope.contents = tmp;
              //     });

              //     console.log($scope.contents);

              // }, 5000);
            },
            error: function(error) {
              console.log("ERROR!");
              console.log(error);
            }
          });

      })(instagramDataUrl, instagramElements);


      var limit;

      function fillArray(source) {

          var array = source.splice(0);

          limit = (array.length >= 10) ? 10 : array.length;

          for(var i = 0; i < limit; i++) {

              if((Date.now() - array[i].info.title*1000) < 5*24*60*60*1000)
              {
                  newest.push(array.splice(i, 1)[0]);
              }
          }

          var random = shuffle(array).splice(0, (20-limit));

          $scope.$apply(function() {
              $scope.contents = shuffle( newest.concat(random) );
          });
      }

      function updateRandom() {

          random = shuffle(random);

          var tmp = random.splice(0, (20-limit));

          $scope.$apply(function() {
              $scope.contents = shuffle( newest.concat(tmp) );
          });
      }


      function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      };

     //  function randomize(array) {
     //      array = shuffle(array);
     //  }


     //  var grid = 4;

     //  var numberOfContents = grid*(grid+1);

     //  var numberOfNew = 10;

     //  function prioritize() {

     //      for(var i = 0; i < 10; i++) {
     //          if(newTest($scope.instagramElements[i].created_time))
     //          {
     //              add($scope.instagramElements[i], i);
     //          }

     //          else
     //          {
     //              numberOfNew--;
     //          }
     //      }
     //  }

    	// function fillArray() {

     //      var arr = $scope.instagramElements.slice(numberOfNew, $scope.instagramElements.length);
     //      randomize(arr);
     //      // console.log("ARR", arr.length);

     //      var limit = (arr.length >= 20) ? 20 : arr.length;

     //      limit += (10 - numberOfNew);

    	// 	  for (var i = 0; i < limit; i++) {
     //          add(arr[i], i+numberOfNew);
     //          console.log('FILL PUSH');
    	// 	  }
    	// }


     //  function cleanArray() {

     //      var tmp = [];

     //      for(var i = 0; i < $scope.contents.length; i++) {

     //          if(newTest($scope.contents[i].info.title))
     //          {
     //              tmp.push($scope.contents[i]);
     //          }
     //      }

     //      $scope.$apply(function() {
     //          $scope.contents = tmp;
     //      });

     //      console.log("CLEAN", $scope.contents);
     //  }


     //  function newTest(t) {
     //      return ((Date.now() - (t * 1000)) < 20*24*60*60*1000);
     //  }

      function add(element, i, array) {

            var info = {
              title: element.created_time * 1000,
              text: element.caption.text || ""
            }

            if (element.type === "video")
            {
                if (element.caption.text === "")
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

                if (element.caption.text === "")
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
  	});
