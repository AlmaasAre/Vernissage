'use strict';

app
  	.controller('MenuCtrl', function ($scope) {
    	
      // Possible symbols: 
      // vegetarian, chicken, fish, meat, nuts, beer, dessert
  		$scope.menuItems = [
  			{ 
          name: "Russisk rødbetsuppe", 
          detail: "Eplepai til dessert", 
          symbols: ["vegetarian", "dessert"] 
        },
  			{ 
          name: "Stekt kylling med ris", 
          detail: "", 
          symbols: ["chicken", "nuts"] 
        },
  			{ 
          name: "Laks med fennikel og poteter", 
          detail: "Maks 2 stykker laks pr person", 
          symbols: ["fish"] 
        },
  			{ 
          name: "Vegetarpasta", 
          detail: "", 
          symbols: ["vegetarian", "nuts"] 
        },
  			{ 
          name: "Chili con carne", 
          detail: "Iskrem til dessert", 
          symbols: ["meat", "nuts", "beer", "dessert"]
        }
  		];

  	});

