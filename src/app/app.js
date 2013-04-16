'use strict';

var myModule = angular.module('centerdevice', ['documents']);

myModule.config(function($routeProvider, $locationProvider) {
	//$locationProvider.html5Mode(true);

	$routeProvider.
	when("/", {
		redirectTo: '/documents'
	}).
	when("/logout", {
		templateUrl: 'partials/documents.tpl.html',
		controller: 'LogoutCtrl'
	}).
	when("/documents", {
		templateUrl: 'partials/documents.tpl.html',
		controller: 'DocumentsCtrl'
	}).
	otherwise({
		redirectTo: '/'
	});
});

// define 401 interceptor
// taken from: http://www.espeo.pl/2012/02/26/authentication-in-angularjs-application
myModule.config(function($httpProvider) {
	var interceptor = ['$rootScope', '$q', function(scope, $q) {

		function success(response) {
			return response;
		}

		function error(response) {
			var status = response.status;

			if (status == 401) {
				var deferred = $q.defer();
				scope.$broadcast('event:loginRequired');

				return deferred.promise;
			}

			// otherwise
			return $q.reject(response);
		}

		return function(promise) {
			return promise.then(success, error);
		}
	}];

	$httpProvider.responseInterceptors.push(interceptor);
});

myModule.run(['$rootScope', '$http', function(scope, $http) {

	/**
	 * On 'loginRequired' redirect to welcome page to login in again.
	 */
	scope.$on('event:loginRequired', function() {
		var welcomeUrl = window.location.protocol + "//" + window.location.host + "/app/welcome.html";
		window.location.href = welcomeUrl;
	});
}]);

myModule.controller('LogoutCtrl', function LogoutCtrl($http, $scope) {
	$http({
		withCredentials: true,
		method: 'GET',
		url: 'http://roca.local:8080/centerdevice-roca/logout'
	}).
	success(function(data, status, headers, config) {
		$scope.$broadcast('event:loginRequired');
	});
}).controller('SearchCtrl', function SearchCtrl($scope, $location) {
	$scope.search = function() {
		var searchQuery = {
			q: $scope.keywords
		}

		if ($scope.keywords != undefined) {
			$location.search(searchQuery);
		}
	}
}).controller('MainCtrl', function MainCtrl() {});