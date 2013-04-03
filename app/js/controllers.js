'use strict';

/* Controllers */

function WelcomeController($scope) {
    //location.origin does not work in Firefox
    $scope.redirectUrl = encodeURI(window.location.protocol + "//" + window.location.host + window.location.pathname);
}

function LogoutController($http, $location) {
    $http({
        withCredentials: true,
        method: 'GET',
        url: 'http://roca.local:8080/centerdevice-roca/logout'
    }).
    success(function(data, status, headers, config) {
        var welcomeUrl = window.location.protocol + "//" + window.location.host + "/app/welcome.html";
        window.location.href = welcomeUrl;
    });
}

function DocumentController($scope, $http) {
    $http({
        withCredentials: true,
        method: 'GET',
        url: 'http://roca.local:8080/centerdevice-roca/documents'
    }).
    success(function(data, status, headers, config) {
        $scope.documents = data.documents;
    });
}