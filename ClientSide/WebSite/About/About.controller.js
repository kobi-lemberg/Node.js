angular.module('aboutangularModule').controller('AboutController',function($rootScope,$scope,$http, $route, $routeParams) {


    /*Retreive projectx.png from node.js server for canvas megic*/
    $http({
        method: 'GET',
        url: '/Images=projectx.png'
    }).then(function successCallback(response) {
        $scope.canvasImage = response.data;
    }, function errorCallback(response) {
        console.log("error with  get /Images=projectx.png");
    });


});