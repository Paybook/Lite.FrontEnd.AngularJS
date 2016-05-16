'use strict';
app.controller('AccountsCtrl', function($timeout, $q, $log) {
    var self = this;

    self.selected = [];

	self.query = {
		order: 'name',
		limit: 5,
		page: 1
	};

	self.all = {
	  "count": 5,
	  "data": [
	    {
	      "name": "Frozen yogurt",
	      "type": "Ice cream",
	      "calories": { "value": 159.0 },
	      "fat": { "value": 6.0 },
	      "carbs": { "value": 24.0 },
	      "protein": { "value": 4.0 },
	      "sodium": { "value": 87.0 },
	      "calcium": { "value": 14.0 },
	      "iron": { "value": 1.0 },
	      "comment": "Not as good as the real thing."
	    }, {
	      "name": "Ice cream sandwich",
	      "type": "Ice cream",
	      "calories": { "value": 237.0 },
	      "fat": { "value": 9.0 },
	      "carbs": { "value": 37.0 },
	      "protein": { "value": 4.3 },
	      "sodium": { "value": 129.0 },
	      "calcium": { "value": 8.0 },
	      "iron": { "value": 1.0 }
	    }, {
	      "name": "Eclair",
	      "type": "Pastry",
	      "calories": { "value":  262.0 },
	      "fat": { "value": 16.0 },
	      "carbs": { "value": 24.0 },
	      "protein": { "value":  6.0 },
	      "sodium": { "value": 337.0 },
	      "calcium": { "value":  6.0 },
	      "iron": { "value": 7.0 }
	    }, {
	      "name": "Cupcake",
	      "type": "Pastry",
	      "calories": { "value":  305.0 },
	      "fat": { "value": 3.7 },
	      "carbs": { "value": 67.0 },
	      "protein": { "value": 4.3 },
	      "sodium": { "value": 413.0 },
	      "calcium": { "value": 3.0 },
	      "iron": { "value": 8.0 }
	    }, {
	      "name": "Jelly bean",
	      "type": "Candy",
	      "calories": { "value":  375.0 },
	      "fat": { "value": 0.0 },
	      "carbs": { "value": 94.0 },
	      "protein": { "value": 0.0 },
	      "sodium": { "value": 50.0 },
	      "calcium": { "value": 0.0 },
	      "iron": { "value": 0.0 }
	    }
	  ]
	}//End of desserts

	self.getDesserts = function () {
		self.desserts = self.all;
	};

	self.getDesserts();
});//End of AccountsCtrl
