'use strict';

var myModule = angular.module('centerdevicePrototype', []);

//is array before function for preventing name loss if file is minimized?
myModule.config(function($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true);

	$routeProvider.
	when("/", {
		templateUrl: 'partials/index.html',
		controller: 'MainController'
	}).
	when("/welcome", {
		templateUrl: 'partials/welcome.html',
		//string of controller: registered controller
		//function: function of controller
		//how to determine if a controller is registered?
		controller: 'WelcomeController'
	}).
	when("/logout", {
		templateUrl: 'partials/welcome.html',
		controller: 'LogoutController'
	}).
	when("/documents", {
		templateUrl: 'partials/documents.html',
		controller: 'DocumentController'
	}).
	otherwise({
		redirectTo: '/'
	});
});