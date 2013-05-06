angular.module('centerdeviceService', ['configurationService'])
	.factory('centerdeviceService', ['$http', '$location', 'configurationService', function($http, $location, config) {
	var centerdevice = {
		getDocuments: function() {
			var searchQuery = $location.search();

			return $http({
				withCredentials: true,
				method: 'GET',
				url: config.baseServiceUrl + '/documents',
				params: searchQuery
			});
		},
		getUserInformation: function() {
			return $http({
				withCredentials: true,
				method: 'GET',
				url: config.baseServiceUrl + '/user'
			});
		},
		logout: function() {
			return $http({
				withCredentials: true,
				method: 'GET',
				url: config.baseServiceUrl + '/logout'
			});
		}
	};

	return centerdevice;
}]);