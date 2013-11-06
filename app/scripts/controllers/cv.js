'use strict';

app
  	.controller('CvCtrl', function ($scope, $timeout) {
    	$scope.animationClass = "flipInY";

    	$scope.people = [
      		{
      			name: 'Helge Standal',
      			dep: 'Department',
      			img: 'http://labs.makingwaves.com/customer/internal/employees/data/img/2x_a504b03dedf0e0c7407eb3d88404c7783a6dfeea.jpg',
      			job: 'Title',
      			available: true,
      			custom: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Itaque, incidunt.',
      			projects: [
      				'Vernissage',
      				'Statens Kartverk',
      				'Haavind',
      				'Internal'
      			]
      		},
      		{
      			name: 'Are Almaas',
      			dep: 'Department',
      			img: 'http://labs.makingwaves.com/customer/internal/employees/data/img/2x_fcd69278309385eb145351f8e4a4c3eef092e4ef.jpg',
      			job: 'Title',
      			available: false,
      			custom: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolorum, placeat.',
      			projects: [
      				'Vernissage',
      				'Statens Kartverk',
      				'Haavind',
      				'Internal'
      			]
      		},
      		{
      			name: 'Asbjørn Vølstad',
      			dep: 'Department',
      			img: 'http://labs.makingwaves.com/customer/internal/employees/data/img/2x_3fb7e5d8697057f204b25b950986a603ec3d3099.jpg',
      			job: 'Title',
      			available: true,
      			custom: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Officiis, eaque!',
      			projects: [
      				'Vernissage',
      				'Statens Kartverk',
      				'Haavind',
      				'Internal'
      			]
      		},
      		{
      			name: 'Adam Dziawgo',
      			dep: 'Department',
      			img: 'http://labs.makingwaves.com/customer/internal/employees/data/img/2x_6737384905f2e70149dafe29df7388009474f10b.jpg',
      			job: 'Title',
      			available: false,
      			custom: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, magnam.',
      			projects: [
      				'Vernissage',
      				'Statens Kartverk',
      				'Haavind',
      				'Internal'
      			]
      		},
      		{
      			name: 'Andreas Fjellstad Dahle',
      			dep: 'Department',
      			img: 'http://labs.makingwaves.com/customer/internal/employees/data/img/2x_f93b09e1b15dd0df09831e689f15458a8706605e.jpg',
      			job: 'Title',
      			available: false,
      			custom: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis, exercitationem!',
      			projects: [
      				'Vernissage',
      				'Statens Kartverk',
      				'Haavind',
      				'Internal'
      			]
      		},
      		{
      			name: 'Dominik Juszczyk',
      			dep: 'Department',
      			img: 'http://labs.makingwaves.com/customer/internal/employees/data/img/2x_a76a040a427077e0452dc6f3231c992ea45c462d.jpg',
      			job: 'Title',
      			available: true,
      			custom: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est, explicabo.',
      			projects: [
      				'Vernissage',
      				'Statens Kartverk',
      				'Haavind',
      				'Internal'
      			]
      		},
      		{
      			name: 'Arne Bakkebø',
      			dep: 'Department',
      			img: 'http://labs.makingwaves.com/customer/internal/employees/data/img/2x_1a8fbec45f4efe81d3ef88bb76919856771bd91c.jpg',
      			job: 'Title',
      			available: true,
      			custom: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, totam.',
      			projects: [
      				'Vernissage',
      				'Statens Kartverk',
      				'Haavind',
      				'Internal'
      			]
      		}
    	];

    	$scope.tiles = [];
    	$scope.tmpNewPeople = [];
		$scope.newPeople = [];
		$scope.selectedTiles = [];
		$scope.populateCount = 0;

    	function shuffle(o) { //v1.0
		    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
	    	// console.log("** Shuffled. **");
		    return o;
		};

		$scope.populateTiles = function() {
			$scope.populateCount++;
			$scope.selectedTiles = [];

			if ($scope.populateCount % 10 == 0 || $scope.populateCount == 1) {
				$scope.newPeople = [];
				$scope.tmpNewPeople = [];

				for (var i = 0; i < $scope.people.length; i++) {
					$scope.tmpNewPeople.push($scope.people[i]);
				}

				// console.log("** Kjørt gjennom alle people **");
			}

			$scope.newPeople = shuffle($scope.tmpNewPeople);

			for (var i = 0; i < 8; i++) {
				$scope.selectedTiles.push($scope.newPeople[i]);
			}

			// console.log("Populate count: " + $scope.populateCount);
			// console.log("Selected tiles: " + $scope.selectedTiles.length);
			// console.log("Tmp new people: " + $scope.tmpNewPeople.length);
			// console.log("New people: " + $scope.newPeople.length);
			// console.log("People: " + $scope.people.length);
		}

		$scope.populateTiles();

		var si = setInterval(function() {
    		$scope.animationClass = "flipInY";
    		$scope.$apply();
    	}, 1000);

		var sin = setInterval(function() {
			var t = $timeout(function() {
				$scope.populateTiles();
			}, 1200);
		}, 8000);

		var sint = setInterval(function() {
    		$scope.animationClass = "fadeOut";
    		$scope.$apply();
    	}, 8000);

  	});
