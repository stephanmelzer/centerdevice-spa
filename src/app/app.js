var myModule = angular.module('centerdevice', ['documents', 'templates-main', 'configurationService']);

myModule.config(['$routeProvider', function($routeProvider) {
	//$locationProvider.html5Mode(true);

	$routeProvider.
	when("/", {
		redirectTo: '/documents'
	}).
	when("/logout", {
		templateUrl: 'documents/documents.tpl.html',
		controller: 'LogoutCtrl'
	}).
	when("/documents", {
		templateUrl: 'documents/documents.tpl.html',
		controller: 'DocumentsCtrl'
	});
}]);

// define 401 interceptor
// taken from: http://www.espeo.pl/2012/02/26/authentication-in-angularjs-application
myModule.config(['$httpProvider', function($httpProvider) {
	var interceptor = ['$rootScope', '$q', function(scope, $q) {

		function success(response) {
			return response;
		}

		function error(response) {
			var status = response.status;

			if (status === 401) {
				var deferred = $q.defer();
				scope.$broadcast('event:loginRequired');

				return deferred.promise;
			}

			// otherwise
			return $q.reject(response);
		}

		return function(promise) {
			return promise.then(success, error);
		};
	}];

	$httpProvider.responseInterceptors.push(interceptor);
}]);

myModule.run(['$rootScope', function(scope) {

	/**
	 * On 'loginRequired' redirect to welcome page to login in again.
	 */
	scope.$on('event:loginRequired', function() {
		var welcomeUrl = window.location.protocol + "//" + window.location.host + "/welcome.html";
		window.location.href = welcomeUrl;
	});
}]);

myModule.controller('LogoutCtrl', ['$http', '$rootScope', 'centerdeviceService', function LogoutCtrl($http, $rootScope, centerdeviceService) {
	var q = centerdeviceService.logout();

	q.success(function() {
		$rootScope.$broadcast('event:loginRequired');
	});

}]).controller('SearchCtrl', ['$scope', '$location', function SearchCtrl($scope, $location) {
	$scope.search = function() {
		var searchQuery = {
			q: $scope.keywords
		};

		if ($scope.keywords !== undefined) {
			$location.search(searchQuery);
		}
	};
}]).controller('MainCtrl', ['$scope', 'configurationService', function MainCtrl($scope, configurationService) {
	$scope.baseServiceUrl = configurationService.baseServiceUrl;
	$scope.currentBaseUrl = window.location.protocol + "//" + window.location.host;

}])
	.controller('UserGroupsCtrl', ['$http', '$scope', 'centerdeviceService', function UserGroupsCtrl($http, $scope, centerdeviceService) {
	$scope.loading = true;
	var q = centerdeviceService.getUserInformation();

	q.success(function(data) {
		//remove the unnamed "all" group
		var groups = data['group-data'];
		groups = groups.splice(0, groups.length - 1);
		data['group-data'] = groups;

		$scope.user = data;
		$scope.loading = false;
	});

}]).controller('MobileDeviceCtrl', ['$scope', function MobileDeviceCtrl($scope) {
	var mobilePlatforms = {
		"Android": "https://play.google.com/store/apps",
		"iPhone": "http://itunes.com/apps/CenterDevice",
		"iPad": "http://itunes.com/apps/CenterDevice",
		"Windows Phone": "http://www.windowsphone.com/en-us/store/overview"
	};

	var userAgent = navigator.userAgent.toLowerCase();

	for (var platform in mobilePlatforms) {
		if (userAgent.indexOf(platform.toLowerCase()) !== -1) {
			$scope.isMobildeDevice = true;
			$scope.appStoreLink = mobilePlatforms[platform];
		}
	}
}]);