'use strict';

app
  	.controller('SocialCtrl', function ($scope, $timeout, $http) {

      $scope.contents = [];

      $scope.employeeDataUrl = "/scripts/data/employees.json";
      $scope.people = [];

      $http.get($scope.employeeDataUrl).then(function(response) {
        $scope.people = response.data;
        
        // for (var i = 3; i <= 23; i++) {
        //   console.log($scope.people[i]);

        //   var content = {
        //     id: i,
        //     url: $scope.people[i].picture,
        //     info: {
        //       title: $scope.people[i].displayname,
        //       text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Rem, soluta!"
        //     }
        //   }

        //   $scope.contents.push(content);
        // }

        createArray();

      });


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
                          url: $scope.people[i].picture
                      });
                  }

                  else
                  {
                      $scope.contents.push({
                          id: i,
                          url: 'http://lorempixel.com/400/400/people/',
                          info: info
                      });
                  }
        			}
    		  }
    	}

      //END fake and random array

  	});
