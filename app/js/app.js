'use strict';

var myModule = angular.module('centerdevicePrototype', []);

//is array before function for preventing name loss if file is minimized?
myModule.config(function($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true);

	$routeProvider.
	when("/", {
		redirectTo: '/documents'
	}).
	when("/logout", {
		templateUrl: 'partials/documents.html',
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