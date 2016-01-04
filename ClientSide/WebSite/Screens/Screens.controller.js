/**
 * Created by refael yehuda on 12/24/2015.
 */
angular.module('angularModule').controller('ScreensController',function($rootScope,$scope,$http, $route, $routeParams) {

    //FIXME need to fix search by birthday
    var fanById = function(fanId){
        for (var i=0;i<$scope.fansclubs.length;i++){
            if($scope.fansclubs[i]._id == fanId ){
                //save the data from all page that use with this controller
                return $scope.fansclubs[i];
            }
        }
        return null;
    }
    //get the fans from the DB
    $http({
        method: 'GET',
        url: '/screensJSON'
    }).then(function successCallback(response) {
        $scope.screens = response.data.JSON;
    }, function errorCallback(response) {
        console.log("error with  get screensJSON");
    });
    $scope.getEdit = function(screen){
        $rootScope.screenToEdit = screen;
        if($rootScope.screenToEdit != undefined && $rootScope.screenToEdit != null)
        {
            window.location.href = "/#/Screens/editScreen";
        }
         else
            console.log("Error in:/#/Screens/editScreen");
    }

    $scope.UpdatesFans = function(fan){
        console.log(fan);
        $http({
            method: 'PUT',
            url: '/fans',
            data: fan
        }).then(function successCallback(response) {
            console.log("OK");
        }, function errorCallback(response) {
            console.log("ERROR");
        });
    }
    $scope.loadDetails = function(fanId){
        $rootScope.fanToEdit = fanById(fanId);
        if($rootScope.fanToEdit != undefined ){
            window.location.href = "/#/FanClubs/details"
        }else{
            window.location.href = "/#/FanClubs";
        }
    }
    $scope.deleteScreen = function(fanId){
        var fanToDelete = fanById(fanId);
        if(fanToDelete.Role != "admin"){
            window.location.href="/#/FanClubs/";
        }else{
            $http({
                method: 'DELETE',
                url: '/deleteScreen' +"=" + fanId
            }).then(function successCallback(response) {
                $scope.fansclubs = response.data.JSON;
                console.log("fan deleted successfully");
            }, function errorCallback(response) {
                console.log("ERROR with deleted fan");
            });
        }

    }
    $scope.groupByYear = function(){

        $http({
            method: 'GET',
            url: '/groupFansByYear'
        }).then(function successCallback(response) {
            $rootScope.groupFans = response.data;
            $rootScope.groupFans.forEach(function (year) {
                console.log(year.count);
                console.log(year._id.Birthdate);
            })
            window.location.href = "/#/FanClubs/GroupFansByBirthdate"
        }, function errorCallback(response) {
            console.log("error with  get fans");
            window.location.href = "/#/FanClubs";
        });
    }

    $scope.groupByGender = function(){

        $http({
            method: 'GET',
            url: '/groupFansByGender'
        }).then(function successCallback(response) {
            $rootScope.groupFans = response.data;
            $rootScope.groupFans.forEach(function (year) {
                console.log(year.count);
                console.log(year._id.Birthdate);
            })
            window.location.href = "/#/FanClubs/GroupFansByGender"
        }, function errorCallback(response) {
            console.log("error with  get fans");
            window.location.href = "/#/FanClubs";
        });
    }

});