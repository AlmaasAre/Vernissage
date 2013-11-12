'use strict';

app
    .controller('TouchCvCtrl', function ($scope, $timeout, $http) {
      $scope.animationClass = "";

      $scope.employeeDataUrl = "/scripts/data/employees.json";
      $scope.addedDataUrl = "/scripts/data/addedData.json";
      $scope.people = [];
      $scope.addedData = [];
      $scope.filtered = false;

      $scope.departments = [
        { name: "sharepoint" },
        { name: "front-end & mobile" },
        { name: "people & processes" },
        { name: "strategy" },
        { name: ".net" },
        { name: ".net 2" },
        { name: "graphic design" },
        { name: "project management" },
        { name: "technology" },
        { name: "sharepoint" },
        { name: "episerver 1" },
        { name: "episerver 2" },
        { name: "interaction design" },
        { name: "pmo" },
        { name: "content-services 1" },
        { name: "application mangement" },
        { name: "communications" },
        { name: "php" },
        { name: "it" },
        { name: "finance & admin" },
        { name: "ito" },
        { name: "it/is" },
        { name: "marketing" },
        { name: "client operations" },
        { name: "bss" },
        { name: "experice research" },
        { name: "java & open source" },
        { name: "lifecycle" },
        { name: "content services" }
      ];

      $scope.getData = function(){
        $http.get($scope.addedDataUrl).then(function(response) {
          $scope.addedData = response.data;
          console.log(response.data);

          $http.get($scope.employeeDataUrl).then(function(secondResponse) {
            $scope.people = secondResponse.data;
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
      
      $scope.fromTile = 0;
      $scope.chosenDepartment = "";

      $scope.filteredItems = [];
      $scope.groupedItems = [];
      $scope.itemsPerPage = 8;
      $scope.pagedItems = [];
      $scope.currentPage = 0;

      $scope.initFiltering = function(department) {
        $scope.chosenDepartment = '' + department;
        $scope.filtered = true;
        $scope.populateData(0);
        $scope.currentPage = 0;
        $scope.groupToPages();
      }

      $scope.populateData = function(from) {
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

        $scope.newPeople = $scope.tmpNewPeople;

        for (var i = from; i < $scope.people.length; i++) {
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
          
          if (($scope.chosenDepartment === "")) {
            $scope.filteredItems.push($scope.newPeople[i]);
          } else {
            if (angular.lowercase($scope.newPeople[i].department) === angular.lowercase($scope.chosenDepartment)) {
              $scope.filteredItems.push($scope.newPeople[i]);
            }
          }
        }
      }

      $scope.groupToPages = function () {
        $scope.pagedItems = [];
        
        for (var i = 0; i < $scope.filteredItems.length; i++) {
            if (i % $scope.itemsPerPage === 0) {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)] = [ $scope.filteredItems[i] ];
            } else {
                $scope.pagedItems[Math.floor(i / $scope.itemsPerPage)].push($scope.filteredItems[i]);
            }
        }
      };
      
      $scope.range = function (start, end) {
        var ret = [];
        if (!end) {
            end = start;
            start = 0;
        }
        for (var i = start; i < end; i++) {
            ret.push(i);
        }
        return ret;
      };
      
      $scope.prevPage = function () {
        if ($scope.currentPage > 0) {
          $scope.currentPage--;
        }
      };
      
      $scope.nextPage = function () {
        if ($scope.currentPage < $scope.pagedItems.length - 1) {
          $scope.currentPage++;
        }
      };
      
      $scope.setPage = function () {
        $scope.currentPage = this.n;
      };

      $scope.swipeFunctionTest = function(direction) {
        console.log($scope.fromTile);
        if (direction === "next") {
          $scope.nextPage();
          console.log("Next");
        } else if (direction === "prev") {
          $scope.prevPage();
          console.log("Prev");
        }
      }

  });
