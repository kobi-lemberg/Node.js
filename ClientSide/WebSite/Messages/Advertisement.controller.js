angular.module('angularModule').controller('AdvertisementController',function($rootScope,$scope,$http, $route, $routeParams) {

    /*Retreive all Advertisement from node.js server*/
    $http({
        method: 'GET',
        url: '/advertisementJSON'
    }).then(function successCallback(response) {
        console.log("GET:advertisment - Success");
        $scope.advertisements = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get screensJSON");
    });

    /*Open screen 4 in new tab*/
    $scope.showScreenExample = function(){
            var win = window.open("/Screen=4", '_blank');
           win.focus();
    }


    /*Render edit page with specific screen details to update*/
    $scope.useSocket = function(){
        $http({
            method: 'GET',
            url: '/TestUpdate?id=4'
        }).then(function successCallback(response) {
            console.log("GET:sockets - Success");
            //$scope.advertisements = response.data.JSON;
        }, function errorCallback(response) {
            console.log("error with  get sockets");
        });
    }


    /*Group screen by their city - GroupBY query*/
    $scope.getMessageDistribution = function(){

        $http({
            method: 'GET',
            url: '/screenCountForMsg'
        }).then(function successCallback(response) {
            console.log(response.data);
            $rootScope.sumMessageInScreens = response.data;
            $rootScope.sumMessageInScreens.forEach(function (obj) {
                console.log(obj._id+","+obj.count);
            })
            window.location.href = "/#/Advertisement/CountScreensForMSG"
        }, function errorCallback(response) {
            console.log("Query Group Screens by city - ERROR");
            window.location.href = "/#/Advertisement";
        });
    }

});