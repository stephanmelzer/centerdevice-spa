'use strict';

/* Controllers */

function MainController($scope) {
    //... determined if logged in...
    //$scope.loggedin = true;
}

function WelcomeController($scope) {
    //location.origin does not work in Firefox
    $scope.redirectUrl = encodeURI(window.location.protocol + '//' + window.location.hostname + ':' + window.location.port + window.location.pathname);
}

function LogoutController($http, $location) {
    $http.get('http://roca.local:8080/centerdevice-roca/logout').
    success(function(data, status, headers, config) {
        $location.path("/welcome");
    });
}

function DocumentController($scope, $http) {
    $http.get('http://roca.local:8080/centerdevice-roca/documents').
    success(function(data, status, headers, config) {
        $scope.documents = data.documents;
    });
}