'use strict';
app.controller('SettingsCtrl', function ($scope,$location,tools) {
	if(!tools.getToken()){$location.path("/login");}
	var self = this;

	var widget = store.get('widget'); 
	if(widget != undefined){
		self.widget = widget;
	}else{
		self.widget = true;
	}//End of IF

	self.changeWidget = function(){
		store.set('widget',self.widget);
	}//End of changeWidget

	pbWidget.setTest();
	pbWidget.setToken(tools.getToken());
	pbWidget.startOn('admin')
});