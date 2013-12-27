'use strict';

app
    .controller('PersonCtrl', function ($scope, $timeout, $http) {
      // $scope.animationClass = "fadeIn";
      $scope.animationClass = "";

      $scope.employeeDataUrl = "/scripts/data/employees.json";
      $scope.addedDataUrl = "/scripts/data/addedData.json";
      $scope.people = [];
      $scope.addedData = [];
      $scope.person = "";
      $scope.backgroundPicture = "http://www.anisagroup.com/cms-assets/images/691573.woman-and-man-at-computer-pointing-at";

      $scope.getData = function(){
        $http.get($scope.addedDataUrl).then(function(response) {
          $scope.addedData = response.data;
          console.log(response.data);

          $http.get($scope.employeeDataUrl).then(function(secondResponse) {
            $scope.people = secondResponse.data;
            $scope.populateTiles();
          });
        });
      };

      $scope.getData();

      $scope.tiles = [];
      $scope.tmpNewPeople = [];
      $scope.newPeople = [];
      $scope.selectedTiles = [];
      $scope.populateCount = 0;
      var addProjects;

      function shuffle(o) {
        for (var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
        return o;
      };

      $scope.populateTiles = function() {
        $scope.populateCount++;
        $scope.selectedTiles = [];
        addProjects = [];

        var random = Math.floor((Math.random()*10));

        if (random == 1 ) {
          $scope.backgroundPicture = "http://www.anisagroup.com/cms-assets/images/691573.woman-and-man-at-computer-pointing-at";
        } else if (random == 2) {
          $scope.backgroundPicture = "http://www.lifed.com/wp-content/uploads/2011/09/hands-holding-ipad-over-table.jpg";
        } else if (random == 3) {
          $scope.backgroundPicture = "http://cdn-static.zdnet.com/i/story/70/00/013930/power-to-the-people-technology.jpg";
        } else if (random == 4) {
          $scope.backgroundPicture = "http://2.bp.blogspot.com/-ML55SHqIURA/UkrCdAiplYI/AAAAAAAAACo/5JnRe7jDs4M/s1600/biz-people-with-coffe-and-laptop.jpg";
        } else if (random == 5) {
          $scope.backgroundPicture = "http://www.itsynergistics.com/wp-content/uploads/2012/03/iStock_000019168462Large.jpg";
        } else if (random == 6) {
          $scope.backgroundPicture = "http://2.bp.blogspot.com/-ML55SHqIURA/UkrCdAiplYI/AAAAAAAAACo/5JnRe7jDs4M/s1600/biz-people-with-coffe-and-laptop.jpg";
        } else if (random == 7) {
          $scope.backgroundPicture = "http://www.bettermobilityforlife.com/wp-content/uploads/2012/02/Ryerson_Arm-2441.jpg";
        } else if (random == 8) {
          $scope.backgroundPicture = "http://a57.foxnews.com/global.fbnstatic.com/static/managed/img/fb/Sbc/biz-on-main/660/371/Business-People-Laptop-Meeting-Planning.jpg?ve=1";
        } else if (random == 9) {
          $scope.backgroundPicture = "http://enterprisestrategies.com/wp-content/uploads/2013/06/business-people-around-computer.jpg";
        }


        if ($scope.populateCount % 10 == 0 || $scope.populateCount == 1) {
            $scope.newPeople = [];
            $scope.tmpNewPeople = [];

            for (var i = 0; i < $scope.people.length; i++) {
                $scope.tmpNewPeople.push($scope.people[i]);
            }
        }

        $scope.newPeople = shuffle($scope.tmpNewPeople);
        $scope.iCount = 1;

        for (var i = 0; i < $scope.iCount; i++) {
          if (
            $scope.newPeople[i].displayname !== "PL Project" && 
            $scope.newPeople[i].displayname !== "NO Project" &&
            $scope.newPeople[i].displayname !== "Dag Hensten" &&
            $scope.newPeople[i].displayname !== "Copy from Torill" &&
            $scope.newPeople[i].displayname !== "Ola Dunk") {
            addProjects = [];

            for (var j = 0; j < $scope.addedData[0].projects.length; j++) {

              if ($scope.addedData[0].projects[j].mail === $scope.newPeople[i].mail) {
                for (var k = 0; k < $scope.addedData[0].projects[j].titles.length; k++) {
                  addProjects.push($scope.addedData[0].projects[j].titles[k]);
                }
                $scope.newPeople[i].available = $scope.addedData[0].projects[j].available;
                $scope.newPeople[i].customText = $scope.addedData[0].projects[j].customText;

                if ($scope.newPeople[i].picture === "http://phone.makingwaves.no/employeepictures/image_missing.png") {
                  $scope.newPeople[i].picture = "/images/cv-placeholder.jpeg";
                }
              }
            }

            $scope.newPeople[i].projects = addProjects;
            $scope.person = $scope.newPeople[i];
          } else {
            if (i !== 0) {
              $scope.iCount++;
            }
          }
        }
      }

      var si = setInterval(function() {
          // $scope.animationClass = "fadeIn";
          $scope.animationClass = "";
          $scope.$apply();
        }, 1000);

      var sin = setInterval(function() {
        var t = $timeout(function() {
          $scope.populateTiles();
        }, 1100);
      }, 15000);

      var sint = setInterval(function() {
          // $scope.animationClass = "fadeOut";
          $scope.animationClass = "";
          $scope.$apply();
        }, 15000);

      });
