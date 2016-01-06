angular.module('angularModule').controller('ScreensController',function($rootScope,$scope,$http, $route, $routeParams) {
    var groupScreensByCityFromController;
    /*Retreive all screens from node.js server*/
    $http({
        method: 'GET',
        url: '/screensJSON'
    }).then(function successCallback(response) {
        $scope.screens = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get screensJSON");
    });

    /*Render edit page with specific screen details to update*/
    $scope.getEdit = function(screen){
        $rootScope.screenToEdit = screen;
        if($rootScope.screenToEdit != undefined && $rootScope.screenToEdit != null)
        {
            window.location.href = "/#/Screens/editScreen";
        }
         else
            console.log("Error in:/#/Screens/editScreen");
    }

    /*Send edit page params of specific screen details to server*/
    $scope.updateScreen = function(screen){
        console.log("Update:"+screen);
        $http({
            method: 'POST',
            url: '/screen',
            data: screen
        }).then(function successCallback(response) {
            console.log("Update:"+screen+" - Success");
        }, function errorCallback(response) {
            console.log("Update:"+screen+" - ERROR");
        });
    }

    /*Send to server ID in order to delete from DB*/
    $scope.deleteScreenByID = function(screenID){
            $http({
                method: 'DELETE',
                url: '/deleteScreen' +"=" + screenID
            }).then(function successCallback(response) {
                $scope.screens = response.data.JSON;
                console.log("Delete: Screen with _id "+screenID+" - Success");
            }, function errorCallback(response) {
                console.log("Delete: Screen with _id "+screenID+" - Error");
            });
    }

    /*Group screen by their city - GroupBY query*/
    $scope.groupScreensByCity = function(){

        $http({
            method: 'GET',
            url: '/screensInCity'
        }).then(function successCallback(response) {
            console.log(response.data);
            groupScreensByCityFromController=response.data;
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

    /*Render create page*/
    $scope.getCreate = function(){
        window.location.href = "/#/Screens/createScreen";
    }
    /*Send create page params of new screen details to server*/
    $scope.createScreen = function(screenToCreate){
        $http({
            method: 'PUT',
            url: '/createNewScreen',
            data: screenToCreate
        }).then(function successCallback(response) {

            console.log("Create:"+screenToCreate+" - Success");
            window.location.href = "/#/Screens";
        }, function errorCallback(response) {
            console.log("Create:"+screenToCreate+" - ERROR");
        });
    }
});