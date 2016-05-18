'use strict';
app.service('tools', function ($http,SatellizerStorage) {

	var getToken = function(){
		var config = {};
		config.tokenName = "token";
		config.tokenPrefix = "paybook";
		var tokenName = config.tokenPrefix ? [config.tokenPrefix, config.tokenName].join('_') : config.tokenName;

		return SatellizerStorage.get(tokenName);
	};//End of return

	this.getToken = getToken;//End of getToken;

	this.backCall = function (endpoint,data,method) {
		return new Promise(function(fulfill,reject){
			var opts = {};
			opts.url = K.BASE_URL + endpoint;
			if(data){
				opts.data = data
			}//End of if Data
			if(method && (method == K.POST_METHOD || method == K.DELETE_METHOD)){
				if(data){
					opts.data['token'] = getToken();
				}else{
					opts.data = {
						'data' : getToken()
					};
				}//End of IF
			}else{
				if(data){
					var payload = '';
					for(var i in data){
						if(payload == ''){
							payload = i + '=' + data[i];	
						}else{
							payload = payload + '&' + i + '=' + data[i];	
						}//End of IF
					}//End of IF
					opts.url = opts.url + '?token=' + getToken() + '&' + payload;
				}else{
					opts.url = opts.url + '?token=' + getToken();
				}//End of IF
			}//End of method

			opts.method = method ? method : K.GET_METHOD;
			$http(opts).then(function(response) {
				return fulfill(response.data);
			},function(error){
				return reject(error);
			});//End of http
		});//End of return
	}//End of backCall
});//