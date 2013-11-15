'use strict';

app
  	.controller('MenuCtrl', function ($scope) {
    	
  		$scope.menuItems = [
  			{ name: "Russisk rødbetsuppe", detail: "Kan inneholde spor av nøtter" },
  			{ name: "Stekt kylling med ris", detail: "" },
  			{ name: "Laks med fennikel og poteter", detail: "" },
  			{ name: "Vegetarpasta", detail: "" },
  			{ name: "Chili con carne", detail: "" }
  		];

  	});
