angular.module('configurationService', [])
	.factory('configurationService', [function() {

	var config = {
		baseServiceUrl: "http://centerdevice-roca.herokuapp.com"
		// baseServiceUrl: "http://roca.local:8080/centerdevice-roca"
	};

	return config;
}]);