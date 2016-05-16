'use strict';
app.controller('WidgetCtrl', function ($scope,tools) {
	// pbWidget.setDev();
	pbWidget.setToken(tools.getToken());
	pbWidget.chooseBank();
});//End of WidgetCtrl