'use strict';
app.controller('WidgetCtrl', function ($scope,tools) {
	pbWidget.setToken(tools.getToken());
	pbWidget.chooseBank();
});//End of WidgetCtrl