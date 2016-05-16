var app = angular.module('App', ['ui.router', 'ngMaterial', 'ngMessages', 'ngMdIcons', 'md.data.table','satellizer','ngWebsocket']);

app.config(function ($authProvider){
    // Parametros de configuración
    $authProvider.loginUrl = "http://localhost:5000/login";
    $authProvider.signupUrl = "http://localhost:5000/signup";
    $authProvider.tokenName = "token";
    $authProvider.tokenPrefix = "paybook";
});

app.config(function ($stateProvider,$urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state("home", {
        url: "/",
        controller: "HomeCtrl",
        templateUrl: "app/views/home.html"
    })
    $stateProvider.state("signup", {
        url: "/signup",
        controller: "SignupCtrl",
        templateUrl: "app/views/signup.html"
    })
    $stateProvider.state("login", {
        url: "/login",
        controller: "LoginCtrl",
        templateUrl: "app/views/login.html"
    })
    $stateProvider.state("sites", {
        url: "/sites",
        controller: "SitesCtrl",
        templateUrl: "app/views/sites.html"
    })
    $stateProvider.state("widget", {
        url: "/widget",
        controller: "WidgetCtrl",
        templateUrl: "app/views/widget.html"
    })
    $stateProvider.state("settings", {
        url: "/settings",
        controller: "SettingsCtrl",
        templateUrl: "app/views/settings.html"
    })
});

app.config(function ($mdThemingProvider) {
    $mdThemingProvider.theme('default')
        .primaryPalette('indigo')
        .accentPalette('pink')
        .warnPalette('red')
        .backgroundPalette('grey');
});

app.config(function($mdIconProvider) {
    $mdIconProvider
      .iconSet('social', 'bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg', 24)
      .defaultIconSet('img/icons/sets/core-icons.svg', 24);    
});
