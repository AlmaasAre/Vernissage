'use strict';

app
  	.controller('SocialCtrl', function ($rootScope, $scope, $timeout, $http, Items) {

      var elements = [];

      var newest = [];
      var random = [];

      $scope.contents = [];

      var seconds = 1000;

      var max = {
        instagram: -1 //Pages of 20 elements. -1 = infinite.
      }

      $scope.currentpage = 0;

      var instagramDataUrl = "https://api.instagram.com/v1/users/35503519/media/recent/?access_token=9105191.1fb234f.6c8ebcb04cad4b39b1c3e340b55d514b";

      function getInstagram(url, array, update) {

          $.ajax({
              dataType: "JSONP",
              url: url,
              success: function(response) {

                  console.log("DATA",response);

                  if(response.data)
                  {
                      for(var i = 0; i < response.data.length; i++) {
                          add(response.data[i], i, array);
                      }

                      if((elements.length/20 < max.instagram || max.instagram === -1) && response.pagination.next_url)
                      {
                          setTimeout(function() {
                              getInstagram(response.pagination.next_url, elements);
                          }, 5*seconds);
                      }

                      else
                      {
                          // elements = shuffle(elements);
                          populateView();
                          console.log("No more data.");
                      }

                      console.log(elements, elements.length);
                  }

                  else
                  {
                      // elements = shuffle(elements);
                      populateView();
                      console.log("No more data.");
                  }


              },
              error: function(error) {
                console.log("ERROR!");
                console.log(error);
              }
          });

      }

      getInstagram(instagramDataUrl, elements);

      var last = false;

      function populateView() {

          $scope.$apply(function applyView() {

              $scope.contents = [];

              // var missing = 0;

              // if(currentpage*20 >= elements.length)
              // {
              //     missing = (currentpage*20 - elements.length)+20;
              //     last = true;
              //     console.log("Last page");
              // }

              // console.log("Missing: "+missing, "From: "+(currentpage*20-missing), "To: "+(currentpage*20+20-missing));

              // for(var i = (currentpage*20-missing); i < (currentpage*20 + 20 - missing); i++) {
                for(var i = 0; i < elements.length; i++) {
                  if(elements[i])
                  {
                      $scope.contents.push(elements[i]);
                  }
              }

              // if(last)
              // {
              //     console.log("Last detected");
              //     currentpage = 0;
              //     last = false;
              // }

              // else
              // {
              //     currentpage++;
              // }

              console.log($scope.contents, $scope.contents.length);
          });

      };

      $scope.$on('NextPage', function() {
          console.log("NextPage");
          // populateView();

          $scope.currentpage++;
          scroll();
      });

      $scope.$on('PrevPage', function() {
          console.log("PrevPage");
          // populateView();

          $scope.currentpage--;
          scroll();
      });

      $scope.$on('Restart', function() {
          console.log('Restart');

          $scope.currentpage = 0;
          scroll();
      });

      function scroll() {
          var p = $scope.currentpage * (-100);
          document.getElementById('social').setAttribute('style', '-webkit-transform: translateY('+p+'%)');
      };

      function shuffle(o) {
          for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
          return o;
      };


      function add(element, i, array) {

            var info = {
                title: element.created_time * 1000,
                text: element.caption?element.caption.text:""
            }

            var obj;

            if(element.type === "video")
            {
                if(element.caption.text === "")
                {
                    obj = {
                        id: array.length,
                        url: element.videos.low_resolution.url,
                        video: true
                    };
                }

                else
                {
                    obj = {
                        id: array.length,
                        url: element.videos.low_resolution.url,
                        info: info,
                        video: true
                    };
                }
            }

            else
            {

                // console.log("Image " + i);

                if(element.caption && element.caption.text === "")
                {
                    obj = {
                        id: array.length,
                        url: element.images.low_resolution.url
                    };
                }

                else
                {
                    obj = {
                        id: array.length,
                        url: element.images.low_resolution.url,
                        info: info
                    };
                }
            }

            array.push(obj);

            if(obj.info)
            {
                Items.queueItem(obj.id);
            }
      }

      // function updateItem(target, source) {

      //       var info = {
      //           title: source.created_time * 1000,
      //           text: source.caption?source.caption.text:""
      //       }

      //       if(source.type === "video")
      //       {
      //           if(source.caption.text === "")
      //           {
      //               target.url = source.videos.low_resolution.url;
      //               target.video = true;
      //           }

      //           else
      //           {
      //               target.url = source.videos.low_resolution.url;
      //               target.info = info;
      //               target.video = true;
      //           }
      //       }

      //       else
      //       {

      //           if(source.caption && source.caption.text === "")
      //           {
      //               target.url = source.images.low_resolution.url;
      //           }

      //           else
      //           {
      //               target.url = source.images.low_resolution.url;
      //               target.info = info;
      //           }
      //       }
      // }
  	});
