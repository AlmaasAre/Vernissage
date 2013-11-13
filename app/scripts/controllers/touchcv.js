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
        { name: "microsoft .net", 
          sub: [".net", ".net 1", ".net 2"] },
        { name: "episerver", 
          sub: ["episerver 1", "episerver 2"] },
        { name: "sharepoint", 
          sub: ["sharepoint"] },
        { name: "front-end & mobile", 
          sub: ["front-end & mobile"] },
        { name: "java & php", 
          sub: ["java & open source", "php"] },

        { name: "graphic design", 
          sub: ["graphic design"] },
        { name: "interaction design", 
          sub: ["interaction design"] },
        { name: "service design", 
          sub: ["service design"] },
        { name: "experience research", 
          sub: ["experience research"] },
        { name: "strategy", 
          sub: ["strategy"] },
        
        { name: "sales", 
          sub: ["sales"] },
        { name: "project management", 
          sub: ["project management"] },
        { name: "application management", 
          sub: ["application management"] },
        { name: "content services", 
          sub: ["content services", "content services 1", "content services 2"] },
        { name: "it support", 
          sub: ["it", "it/is"] },
        { name: "finance & admin", 
          sub: ["finance & admin"] },

        { name: "people & processes", 
          sub: ["people & processes"] },
        
        { name: "other departments", 
          sub: ["ito", "pmo", "lifecycle", "bss", "client operations", "communications", "technology", "marketing", "managing director", "ceo", "experience design"] },
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
      $scope.chosenDepartment;

      $scope.filteredItems = [];
      $scope.groupedItems = [];
      $scope.itemsPerPage = 7;
      $scope.pagedItems = [];
      $scope.currentPage = 0;

      $scope.initFiltering = function(departmentArray) {
        $scope.chosenDepartment = departmentArray;
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
          if (
            $scope.people[i].displayname !== "PL Project" && 
            $scope.people[i].displayname !== "NO Project" &&
            $scope.people[i].displayname !== "Dag Hensten" &&
            $scope.people[i].displayname !== "Copy from Torill" &&
            $scope.people[i].displayname !== "Ola Dunk") {

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
            console.log($scope.newPeople[i]);
            
            if (($scope.chosenDepartment === "")) {
              $scope.filteredItems.push($scope.newPeople[i]);
            } else {
              for (var a = 0; a < $scope.chosenDepartment.length; a++) {
                if (angular.lowercase($scope.newPeople[i].department) === angular.lowercase($scope.chosenDepartment[a])) {
                  $scope.filteredItems.push($scope.newPeople[i]);
                }
              }
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

      $scope.back = function() {
        $scope.filtered = false;
        $scope.pagedItems = [];
        $scope.filteredItems = [];
      }

      $scope.swipeEvents = function(direction) {
        console.log($scope.fromTile);
        if (direction === "next") {
          $scope.nextPage();
        } else if (direction === "prev") {
          if ($scope.currentPage === 0) {
            $scope.back();
          } else {
            $scope.prevPage();
          }
        }
      }

  });
