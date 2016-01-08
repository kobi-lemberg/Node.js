angular.module('angularModule').controller('SearchController',function($rootScope,$scope,$http, $route, $routeParams,MyService) {
console.log("Search controller is up");


    /*Adapter functions with MyService for  search bar*/
    $scope.searchAdvertisment = function() {
        console.log("Search controller - searchAdvertisment");
        MyService.searchAdvertisment();
    }

    $scope.getSearchScreenParams = function() {
        console.log("Search controller - getSearchScreenParams");
        MyService.getSearchScreenParams();
    }



});