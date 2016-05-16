var callToBackEnd = function(endpoint, dataToSend){
	return new Promise(function(fulfill,reject){
		$.ajax({
			url: K.BASE_URL + endpoint,
			type: K.POST_METHOD,
			contentType: "application/json",
			dataType: "json",
			data: dataToSend
		}).done(function(response){
			return fulfill(response);
		}).fail(function(jqXHR, textStatus){
			return reject(textStatus);
		});//End of ajax
	});//End of return
}//End of callToBackEnd