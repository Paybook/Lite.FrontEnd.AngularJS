'use strict';
app.controller('SettingsCtrl', function ($scope,$location,tools) {
	if(!tools.getToken()){$location.path("/login");}
	var self = this;

	var widget = store.get('widget'); 
	if(widget != undefined){
		self.widget = widget;
	}else{
		self.widget = false;
	}//End of IF

	var development = store.get('development'); 
	if(development != undefined){
		self.development = development;
	}else{
		self.development = true;
	}//End of IF

	self.changeWidget = function(){
		store.set('widget',self.widget);
	}//End of changeWidget

	self.changeDevelopment = function(){
		store.set('development',self.development);
	}//End of changeWidget

	if(self.development){
		pbWidget.setTest();
	}//End of IF
	pbWidget.setToken(tools.getToken());
	pbWidget.startOn('admin')
});