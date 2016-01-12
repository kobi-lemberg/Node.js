angular.module('angularModule').controller('AnalyticsController',function($rootScope,$scope,$http, $route, $routeParams,MyService) {

    /*Retreive all screens from node.js server for googelMaps*/
    $http({
        method: 'GET',
        url: '/screensJSON'
    }).then(function successCallback(response) {
        console.log(response.data);
        //$rootScope.screensForGoogleMaps = response.data.JSON;
        //$rootScope.myLatLng = { lat: 32.0852999, lng: 34.78176759999997 };
        var screensForGoogleMaps = response.data.JSON;
        console.log("screensForGoogleMaps:"+screensForGoogleMaps);
        var myLatLng = { lat: 32.0852999, lng: 34.78176759999997 };
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 9,
            center: myLatLng
        });
        var geocoder = new google.maps.Geocoder();
        for (var k in screensForGoogleMaps) {
            console.log("screensForGoogleMaps[k]:"+screensForGoogleMaps[k]);
            console.log("t[k].screenCity:"+screensForGoogleMaps[k].screenCity);
            geocoder.geocode({ 'address': screensForGoogleMaps[k].screenCity }, function (results, status) {

                if (status == google.maps.GeocoderStatus.OK) {
                    console.log("OK!");
                    var latitude = results[0].geometry.location.lat();
                    var longitude = results[0].geometry.location.lng();
                }
                var myLatLng2 = { lat: latitude, lng: longitude };
                var marker = new google.maps.Marker({
                    position: myLatLng2,
                    map: map,
                    title: 'Screen deployment'
                });
            });
        }
        $scope.map = map;

    }, function errorCallback(response) {
        console.log("error with  get screensJSON");
    });


    MyService.fb(document, 'script', 'facebook-jssdk');

    $scope.postOnFB = function(){
        console.log("postOnFBValue:"+$scope.postOnFBValue);
        $http({
            method: 'POST',
            url: '/postOnFacebook',
            data: $scope.postOnFBValue
        }).then(function successCallback(response) {
            console.log("FB response:"+response.data);
            $rootScope.fbResponse = response.data;
        }, function errorCallback(response) {
            console.log("Query Group Screens by city - ERROR");
            window.location.href = "/#/Advertisement";
        });
    }



});