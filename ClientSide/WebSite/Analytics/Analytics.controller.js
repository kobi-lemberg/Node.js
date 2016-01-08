angular.module('homeangularModule').controller('AnalyticsController',function($rootScope,$scope,$http, $route, $routeParams) {

    /*Retreive all screens from node.js server for googelMaps*/
    $http({
        method: 'GET',
        url: '/screensJSON'
    }).then(function successCallback(response) {
        console.log(response.data);
        $rootScope.screensForGoogleMaps = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get screensJSON");
    });

});