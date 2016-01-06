angular.module('homeangularModule').controller('HomeController',function($rootScope,$scope,$http, $route, $routeParams) {

    /*Retreive all screens from node.js server*/
    $http({
        method: 'GET',
        url: '/screensJSON'
    }).then(function successCallback(response) {
        console.log(response.data);
        $rootScope.screensForGoogleMaps = response.data.JSON;
       // $scope.screensForGoogleMaps = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get screensJSON");
    });

    /*Group screen by their city - GroupBY query*/
    $scope.groupScreensByCity = function(){

        $http({
            method: 'GET',
            url: '/screensInCity'
        }).then(function successCallback(response) {
            console.log(response.data);
            $rootScope.groupScreensByTheirCity = response.data;
            $rootScope.groupScreensByTheirCity.forEach(function (obj) {
                console.log(obj._id+","+obj.count);
            })
            window.location.href = "/#/Screens/GroupScreensByCity"
        }, function errorCallback(response) {
            console.log("Query Group Screens by city - ERROR");
            window.location.href = "/#/Screens";
        });
    }

});