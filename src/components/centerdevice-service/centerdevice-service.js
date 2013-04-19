angular.module('centerdeviceService', [])
	.factory('centerdeviceService', ['$http', '$location', function($http, $location) {
	var centerdevice = {
		getDocuments: function(scope) {
			var searchQuery = $location.search();

			$http({
				withCredentials: true,
				method: 'GET',
				url: 'http://roca.local:8080/centerdevice-roca/documents',
				params: searchQuery
			}).
			success(function(data) {
				scope.documents = data.documents;
			});
		},
		getUserInformation: function(scope) {
			$http({
				withCredentials: true,
				method: 'GET',
				url: 'http://roca.local:8080/centerdevice-roca/user'
			}).
			success(function(data) {
				//remove the unnamed "all" group
				var groups = data['group-data'];
				groups = groups.splice(0, groups.length - 1);
				data['group-data'] = groups;

				scope.user = data;
			});
		},
		logout: function(scope) {
			$http({
				withCredentials: true,
				method: 'GET',
				url: 'http://roca.local:8080/centerdevice-roca/logout'
			}).
			success(function() {
				scope.$broadcast('event:loginRequired');
			});
		}
	};

	return centerdevice;
}]);