'use strict';

angular.module('documents', [])
    .controller('DocumentsCtrl', function DocumentsCtrl($scope, $http, $location) {
    var searchQuery = $location.search();

    $http({
        withCredentials: true,
        method: 'GET',
        url: 'http://roca.local:8080/centerdevice-roca/documents',
        params: searchQuery
    }).
    success(function(data, status, headers, config) {
        $scope.documents = data.documents;
    });
})
    .filter('fileSize', function() {
    // taken from http://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable#
    var fileSizeFilter = function(fileSizeInBytes) {
        var i = -1;
        var byteUnits = [' kB', ' MB', ' GB', ' TB', ' PB', ' EB', ' ZB', ' YB'];
        do {
            fileSizeInBytes = fileSizeInBytes / 1024;
            i++;
        } while (fileSizeInBytes > 1024);

        // no locale formatted string supported
        return Math.max(fileSizeInBytes, 0.1).toFixed(1) + byteUnits[i];
    };

    return fileSizeFilter;
});