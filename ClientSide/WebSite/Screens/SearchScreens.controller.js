angular.module('angularModule').controller('SearchScreensController',function($rootScope,$scope,$http, $route, $routeParams,MyService) {

    /*Retreive all screens from node.js server*/
    console.log("SearchScreensController");
    console.log("dataToSend"+JSON.stringify(MyService.dataToSendToServer));
    $http({
        method: 'POST',
        url: '/searchScreen',
        data:MyService.dataToSendToServer

    }).then(function successCallback(response) {
        console.log("Searched advertisment:"+response.data);
        $scope.searchedScreens = response.data;
    }, function errorCallback(response) {
        console.log("error with  get screensJSON");
        console.log(response);
    });

    $( "#getSearchScreenParams" ).click(function() {
        $http({
            method: 'POST',
            url: '/searchScreen',
            data:MyService.dataToSendToServer

        }).then(function successCallback(response) {
            console.log("Searched advertisment:"+response.data);
            $scope.searchedScreens = response.data;
        }, function errorCallback(response) {
            console.log("error with  get screensJSON");
            console.log(response);
        });
    });

});