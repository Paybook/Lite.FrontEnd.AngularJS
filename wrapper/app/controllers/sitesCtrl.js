'use strict';
app.controller('SitesCtrl', function ($scope, $mdSidenav, $log, tools, SatellizerStorage,$mdDialog, $mdToast,$location) {

	var self = this;
	self.widget = store.get('widget');
	self.selectedItem = {};
	self.credentials = [];
	
	self.toggleRight = buildToggler('right');

	function buildToggler(navID) {
		return function() {
			if('credentials' in self.selectedItem){
				$mdSidenav(navID)
					.toggle()
					.then(function () {
						$scope.site = self.selectedItem;
						$scope.id_site = $scope.site.id_site;
						$scope.credentials = $scope.site.credentials;
						$scope.type = 'credentials';
					});
			}//End of IF
		}//End of return
	}//End of buildToggler

	self.selectSite = function(){
		self.toggleRight();
	}//End of selectSite
	self.toggleSelectSection = function(credential){
		window.location = window.location.protocol +  '//' + window.location.host + '/#/transactions?id_site=' + credential.id_site;
		// $location.path(parameters)
		// credential.done = !credential.done;
		// if(credential.done){
		// 	$scope.$parent.index.loading = true;
		// 	var data = {
		// 		id_site : credential.id_site
		// 	}//End of data
		// 	tools.backCall('accounts',data)
		// 		.then(function(response){
		// 			$scope.$parent.index.loading = false;
		// 			$scope.$apply(function(){
		// 				credential.accounts = response;
		// 			});
		// 		})
		// 		.catch(function(error){
		// 			console.log(error);
		// 		});
		// }//End of IF
	}//End of toggleSelectSection

	self.toggleSelectAccount = function(account){
		account.done = !account.done;
		if(account.done){
			$scope.$parent.index.loading = true;
			var data = {
				id_account : account.id_account
			}//End of data
			tools.backCall('transactions',data)
				.then(function(response){
					$scope.$parent.index.loading = false;
					$scope.$apply(function(){
						account.transactions = response.transactions;
						console.log(response);
					});
				})
				.catch(function(error){
					console.log(error);
				});
		}//End of IF
	}//End of toggleSelectSection

	self.isSectionSelected = function(credential){
		return credential.done;
	}//End of isSectionSelected

	self.isAccountSelected = function(account){
		return account.done;
	}//End of isSectionSelected

	self.deleteCredentials = function(credential,index){

		$scope.$parent.index.loading = true;
		var data = {
			id_credential : credential.id_credential
		}
		tools.backCall('credentials',data,K.DELETE_METHOD)
			.then(function(response){
				$scope.$apply(function(){
					$scope.$parent.index.loading = false;
					self.credentials.splice(index, 1);
				});//End of $apply
			})
			.catch(function(error){
				console.log(error);
			});
	}//End of deleteCredentials

	self.getAvatar = function(avatar){
		return 'https://s.paybook.com' + avatar;
	}//End of getAvatar

	self.init = function(){

		$scope.$parent.index.loading = true;

		tools.backCall('catalogues')
			.then(function(response){
				self.sites = response;
				tools.backCall('credentials')
					.then(function(response){
						
						$scope.$apply(function(){
							$scope.$parent.$parent.index.loading = false;
							$scope.$parent.index.loading = false;
						});//End of $apply
						
						self.credentials = response;

						if(self.widget){
							pbWidget.setTest();
							pbWidget.setToken(tools.getToken());
							pbWidget.chooseBank();
						}//End of IF
					})
					.catch(function(error){
						console.log(error);
					});
			})
			.catch(function(error){
				window.location = window.location.protocol +  '//' + window.location.host + '/#/login';
				$location.path("/login");
			});

		
	}//End of init

	self.showSimpleToast = function(message) {
		$mdToast.show(
			$mdToast.simple()
				.textContent(message)
				.position('bottom')
				.hideDelay(3000)
		);
	};//End of showSimpleToast

});//End of SitesCtrl

app.controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log, tools, $http, $mdToast) {
	var self = this;
	$scope.close = function () {
		$mdSidenav('right').close()
			.then(function () {
			});
	};//End of close
	$scope.twofa = {};
	$scope.done = function(){
		$scope.$parent.index.loading = true;
		if($scope.$parent.type == 'credentials'){
			var data = {
				'id_site' : $scope.id_site, 
				'credentials' : {}
			}//End of data

			for(var i=0;i<$scope.$parent.credentials.length;i++){
				data['credentials'][$scope.$parent.credentials[i].name] = $scope.$parent.credentials[i].value;
			}//End of for

			tools.backCall('credentials',data,K.POST_METHOD)
				.then(function(response){
					$scope.$parent.type = 'twofa';
					for(var attribute in response){
						 $scope.site[attribute] = response[attribute];
					}//End of for
					webSocket($scope.site.ws);
				})
				.catch(function(error){
					console.log(error);
				});//End of error
		}else{
			var data = {
				'id_site' : $scope.site.id_site,
				'twofa' : {}
			}//End of data

			for(var i=0;i<$scope.twofa.length;i++){
				data.twofa[$scope.twofa[i].name] = $scope.$parent.credentials[i].value;
			}//End of for

			tools.backCall('twofa',data,K.POST_METHOD)
				.then(function(response){
					webSocket($scope.site.ws);
				})
				.catch(function(error){
					console.log(error);
				});//End of error
		}//End of IF
		

		
		var webSocket = function(ws){
			var message;
			var connection = new WebSocket(ws);
			connection.onmessage = function (event) {
				$scope.data = JSON.parse(event.data);
				if($scope.data.code == 401){
					message = 'Invalid credentials (user and password are not valid)'
					connection.close();
				}else if($scope.data.code == 405){
					message = 'Account is locked';
					connection.close();
				}else if($scope.data.code == 406){
					message = 'User is already logged';
					connection.close();
				}else if($scope.data.code == 410){
					message = 'Waiting for two-fa';
					connection.close();
				}else if($scope.data.code == 200){
					message = 'Cuenta sincronizada correctamente';
					connection.close();
				}else if($scope.data.code > 500){
					message = 'Problemas con la cuenta';
					connection.close();
				}else{
					message = '';
				}//End of IF
			}//End of onmessage

			connection.onerror = function (error) {
				console.log('WebSocket Error ' + error);
			};//End of onerror

			connection.onclose = function(event) {
				$scope.$parent.index.loading = false;
				if($scope.data.code == 410){
					$scope.twofa = $scope.data.twofa;
					$scope.$parent.credentials = [];
					for(var i=0;i<$scope.data.twofa.length;i++){
						var credential = {
							'label' : $scope.data.twofa[i].label,
							'type' : $scope.data.twofa[i].type,
							'name' : $scope.data.twofa[i].name,
						};//End of credential
						if('imgBase64File' in $scope.data.twofa[i]){
							credential['imgBase64File'] = $scope.data.twofa[i].imgBase64File;
						}//End of IF
						$scope.$parent.credentials.push(credential);
					}//End of FOR
				}else if($scope.data.code >= 500){
					var data = {
						id_credential : $scope.site.id_credential
					}//End of data
					tools.backCall('credentials',data,K.DELETE_METHOD)
						.then(function(response){
							console.log(response);
						})
						.catch(function(error){
							console.log(error);
						});
				}else{
					$scope.$parent.menu.credentials.push($scope.site);
					$scope.close();
				}//End of IF
				$scope.$parent.menu.showSimpleToast(message);
			};//End of  onclose
		}//End of webSocket 

	};//End of done
});//End of RightCtrl