'use strict';
app.controller('WidgetCtrl', function ($scope,tools,$location) {

	pbWidget.setTest();
	pbWidget.setToken(tools.getToken());
	pbWidget.chooseBank();

	var self = this;
	self.credentials = [];

	// self.init = function(){
	// 	$scope.$parent.index.loading = true;
	// 		tools.backCall('credentials')
	// 			.then(function(response){
	// 				$scope.$apply(function(){
	// 					$scope.$parent.$parent.index.loading = false;
	// 					$scope.$parent.index.loading = false;
	// 				});//End of $apply
	// 				self.credentials = response;
	// 			})
	// 			.catch(function(error){
	// 				console.log(error);
	// 			});
	// }//End of init

	self.getAvatar = function(avatar){
		return 'https://s.paybook.com' + avatar;
	}//End of getAvatar

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

	self.toggleSelectSection = function(credential){
		credential.done = !credential.done;
		if(credential.done){
			$scope.$parent.index.loading = true;
			var data = {
				id_site : credential.id_site
			}//End of data
			tools.backCall('accounts',data)
				.then(function(response){
					$scope.$parent.index.loading = false;
					$scope.$apply(function(){
						credential.accounts = response;
					});
				})
				.catch(function(error){
					console.log(error);
				});
		}//End of IF
	}//End of toggleSelectSection
});//End of WidgetCtrl