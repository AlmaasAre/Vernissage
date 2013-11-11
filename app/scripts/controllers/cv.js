'use strict';

app
    .controller('CvCtrl', function ($scope, $timeout, $http) {
      $scope.animationClass = "flipInY";

      $scope.employeeDataUrl = "/scripts/data/employees.json";
      $scope.addedDataUrl = "/scripts/data/addedData.json";
      $scope.people = [];
      $scope.addedData = [];

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

        if ($scope.populateCount % 10 == 0 || $scope.populateCount == 1) {
            $scope.newPeople = [];
            $scope.tmpNewPeople = [];

            for (var i = 0; i < $scope.people.length; i++) {
                $scope.tmpNewPeople.push($scope.people[i]);
            }
        }

        $scope.newPeople = shuffle($scope.tmpNewPeople);

        for (var i = 0; i < 8; i++) {
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
          $scope.selectedTiles.push($scope.newPeople[i]);
        }
      }

      var si = setInterval(function() {
          $scope.animationClass = "flipInY";
          $scope.$apply();
        }, 1000);

      var sin = setInterval(function() {
        var t = $timeout(function() {
          $scope.populateTiles();
        }, 1100);
      }, 12000);

      var sint = setInterval(function() {
          $scope.animationClass = "fadeOut";
          $scope.$apply();
        }, 12000);

      });
