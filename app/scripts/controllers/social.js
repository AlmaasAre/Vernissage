'use strict';

app
  	.controller('SocialCtrl', function ($scope, $timeout, $http) {

      $scope.contents = [];

      $scope.employeeDataUrl = "/scripts/data/employees.json";
      $scope.people = [];

      $http.get($scope.employeeDataUrl).then(function(response) {
        $scope.people = response.data;

        createArray();

      });

      $scope.images = [
        "http://distilleryimage0.s3.amazonaws.com/f2813d0847d311e3ab6f0e5773f5d485_8.jpg",
        "http://distilleryimage1.s3.amazonaws.com/a88cc98847c911e393790a2aba0db6c1_8.jpg",
        "http://distilleryimage3.s3.amazonaws.com/70210da0431b11e3b0ac22000ab780a6_8.jpg",
        "http://distilleryimage10.s3.amazonaws.com/cbb87446425311e39da122000a9e28e0_8.jpg",
        "http://distilleryimage11.s3.amazonaws.com/7529c3e63da311e3a0b722000ae911ee_8.jpg",
        "http://distilleryimage4.s3.amazonaws.com/caa016e83d8211e38c3f22000ae800af_8.jpg",
        "http://distilleryimage10.s3.amazonaws.com/c22f98ca3a3611e3961e22000aa81fac_7.jpg",
        "http://distilleryimage0.s3.amazonaws.com/d2c20f0e3a3311e399bc22000aeb0b9f_8.jpg",
        "http://distilleryimage0.s3.amazonaws.com/2b1fd11a318b11e3aaec22000a1faf7c_8.jpg",
        "http://distilleryimage2.s3.amazonaws.com/ff3ccecc2f3c11e3bafe22000a9e1853_8.jpg",
        "http://distilleryimage3.s3.amazonaws.com/a0d730be163911e3b0b61231390e4476_7.jpg",
        "http://distilleryimage6.s3.amazonaws.com/0b8dc09e14d711e3a7f322000a1f9a55_7.jpg",
        "http://distilleryimage10.s3.amazonaws.com/517a940813b811e3a6b122000a9f3070_7.jpg",
        "http://distilleryimage0.s3.amazonaws.com/dc92bda2df1211e292eb22000a1fbd89_7.jpg",
        "http://distilleryimage4.s3.amazonaws.com/e24ee31ad3ff11e29cc822000a1f96e3_7.jpg",
        "http://distilleryimage5.s3.amazonaws.com/4848707887d411e2a8e322000a9f13d9_7.jpg",
        "http://distilleryimage3.s3.amazonaws.com/eadcc6cc7c4911e2902122000a9e5160_7.jpg",
        "http://distilleryimage2.s3.amazonaws.com/6b74ad8a5aef11e2aaa822000a1fb0dd_7.jpg",
        "http://distilleryimage4.s3.amazonaws.com/f94c21a4672111e2843f22000a9e0722_7.jpg",
        "http://distilleryimage7.s3.amazonaws.com/eab0c666bbb011e2bcaf22000a1fbcb3_7.jpg"
      ];


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

          var grid = 4;

          var info = {
              title: "Test title",
              text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum libero omnis accusamus asperiores iste voluptates magnam. Alias, quia, fugiat, dolore nihil similique illo nesciunt et accusantium modi tenetur asperiores iusto."
          };

          var numberOfContents = grid*(grid+1);

    		  for(var i = 0; i < numberOfContents; i++) {

        			if(Math.floor((Math.random()*5)+1) === 1)
        			{
        				  $scope.contents.push({
                      id: i,
                      url: 'http://www.w3schools.com/html/mov_bbb.mp4',
                      video: true,
                      info: info
                  });
        			}

        			else
        			{
                  var bool = (Math.floor((Math.random()*2)+1) === 1)

                  if(bool)
                  {
            				  $scope.contents.push({
                          id: i,
                          url: $scope.images[i]
                      });
                  }

                  else
                  {
                      $scope.contents.push({
                          id: i,
                          url: $scope.images[i],
                          info: info
                      });
                  }
        			}
    		  }
    	}

      //END fake and random array

  	});
