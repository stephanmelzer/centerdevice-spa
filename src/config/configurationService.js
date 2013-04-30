angular.module('configurationService', [])
	.factory('configurationService', [function() {

	var config = {
		baseServiceUrl: "http://centerdevice-roca.herokuapp.com/"
	};

	return config;
}]);