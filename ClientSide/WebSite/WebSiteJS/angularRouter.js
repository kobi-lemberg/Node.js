'use strict'             //module
var app = angular.module('angularModule', ['ngRoute','aboutangularModule','homeangularModule']);
var about = angular.module('aboutangularModule', ['ngRoute']);
var home = angular.module('homeangularModule', ['ngRoute']);


app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',
            {
                controller: 'HomeController',
                templateUrl: '/WebSite/Home/Home.html'
            })
        .when('/Screens',
            {
                controller: 'ScreensController',
                templateUrl: '/WebSite/Screens/Screens.html'
            })
        .when('/Screens/editScreen',
            {
                controller: 'ScreensController',
                templateUrl: '/WebSite/Screens/editScreen.html'
            })
        .when('/Screens/createScreen',
            {
                controller: 'ScreensController',
                templateUrl: '/WebSite/Screens/createScreen.html'
            })
        .when('/Screens/SearchScreens',
            {
                controller: 'SearchScreensController',
                templateUrl: '/WebSite/Screens/SearchScreens.html'
            })
        .when('/Advertisement',
            {
                controller: 'AdvertisementController',
                templateUrl: '/WebSite/Messages/Advertisement.html'
            })
        .when('/Advertisement/CountScreensForMSG',
            {
                controller: 'AdvertisementController',
                templateUrl: '/WebSite/Messages/CountScreensForMSG.html'
            })
        .when('/Advertisement/SearchAdvertisement',
            {
                controller: 'SearchAdvertisementController',
                templateUrl: '/WebSite/Messages/SearchAdvertisement.html'
            })

        .when('/About',
            {
                controller: 'AboutController',
                templateUrl: '/WebSite/About/AboutUs.html'
            })
        .when('/Screens/GroupScreensByCity',
            {
                controller: 'ScreensController',
                templateUrl: '/WebSite/Screens/GroupScreensByCity.html'
            })
        .when('/Analytics',
            {
                controller: 'AnalyticsController',
                templateUrl: '/WebSite/Analytics/Analytics.html'
            })
        .otherwise({redirectTo:'/'});
}]);


app.service('MyService', function() {
    this.dataToSendToServer='';
    this.searchAdvertisment = function(){
        var name=$("#searchAdvertisementByName").val();
        var texts=$("#searchAdvertisementByTexts").val();
        var seconds=$("#searchAdvertisementBySeconds").val();
        var postData=({
            "name":name,
            "texts":texts,
            "seconds":seconds
        });
        var name=$("#searchAdvertisementByName").val("");
        var texts=$("#searchAdvertisementByTexts").val("");
        var seconds=$("#searchAdvertisementBySeconds").val("");
        this.dataToSendToServer=postData;
        console.log(name);
        console.log(texts);
        console.log(seconds);
        console.log("Post data="+postData);
        window.location.href = "/#/Advertisement/SearchAdvertisement";
    }


    this.getSearchScreenParams = function(){
        var screenCity=$("#searchScreenByscreenCity").val();
        var street=$("#searchScreenBystreet").val();
        var houseNumber=$("#searchScreenByhouseNumber").val();
        var postData=({
            "screenCity":screenCity,
            "street":street,
            "houseNumber":houseNumber
        });
        $("#searchScreenByscreenCity").val("");
        $("#searchScreenBystreet").val("");
        $("#searchScreenByhouseNumber").val("");
        this.dataToSendToServer=postData;
        console.log(screenCity);
        console.log(street);
        console.log(houseNumber);
        console.log("Post data="+postData);
        window.location.href = "/#/Screens/SearchScreens";
    }

    this.fb=function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5&appId=1082380968462990";
        fjs.parentNode.insertBefore(js, fjs);
    };

});
