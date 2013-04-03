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