'use strict';
app.controller('TransactionsCtrl', function($scope,$timeout, $q, $log, tools,$routeParams,$location) {

    var self = this;
    var i = 0;
    self.selected = [];

    self.filter = {
    	show : false,
    	options : []
    }

    self.prevPage = 1;
	self.query = {
		order: 'name',
		limit: 5,
		page: 1,
		filter : '',
	};

	self.all = {
	  "count": 0,
	  "data": []
	}//End of desserts

	self.accounts = {};

	self.getDesserts = function () {
		var pages = Math.ceil(self.all.count / self.query.limit);
		var amount = Math.floor(self.all.count / pages);
		var start = 0;
		var end = 0;

		start = (self.query.page-1) * amount;
		end = start + self.query.limit;
		var subarray = self.all.data.slice(start,end);

		self.prevPage = self.query.page;

		$scope.$apply(function(){
			self.desserts = {
				count : self.all.count,
				data : subarray	
			};
		});//End of $apply
	};

	// self.getDesserts();

	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		    results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}

	self.init = function(){
		
		
		if(getParameterByName('id_site')){
			var data = {
				id_site : getParameterByName('id_site')
			};//End of data
			tools.backCall('accounts',data)
				.then(function(response){
					for(var i=0;i<response.length;i++){
						self.accounts[response[i].id_account] = response[i].name; 
					}//End of FOR
					tools.backCall('transactions',data)
						.then(function(response){
							self.all.count = response.transactions.length; 
							for(var i=0; i<response.transactions.length;i++){
								var transaction = {
									"description": response.transactions[i].description,
									"account": {
										"id" : response.transactions[i].id_account,
										"name" : self.accounts[response.transactions[i].id_account]
									},
									"amount": response.transactions[i].amount,
								};//End of IF

								self.all.data.push(transaction);							
							}//End of FOR
							self.getDesserts();
						})
						.catch(function(error){
							console.log(error);
						});
				})
				.catch(function(error){
					$location.path("/login");
					window.location = window.location.protocol +  '//' + window.location.host + '/#/login'
				});
		}else{
			tools.backCall('accounts')
				.then(function(response){
					for(var i=0;i<response.length;i++){
						self.accounts[response[i].id_account] = response[i].name; 
					}//End of FOR
					tools.backCall('transactions')
						.then(function(response){
							self.all.count = response.transactions.length; 
							for(var i=0; i<response.transactions.length;i++){
								var transaction = {
									"description": response.transactions[i].description,
									"account": {
										"id" : response.transactions[i].id_account,
										"name" : self.accounts[response.transactions[i].id_account]
									},
									"amount": response.transactions[i].amount,
								};//End of IF

								self.all.data.push(transaction);							
							}//End of FOR
							self.getDesserts();
						})
						.catch(function(error){
							console.log(error);
						});
				})
				.catch(function(error){
					$location.path("/login");
					window.location = window.location.protocol +  '//' + window.location.host + '/#/login'
				});
		}//End of IF
		
	}//End of init

});//End of AccountsCtrl
