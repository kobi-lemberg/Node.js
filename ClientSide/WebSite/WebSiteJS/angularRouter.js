'use strict'             //module
var app = angular.module('angularModule', ['ngRoute']);

app.config(['$routeProvider',function($routeProvider){
    $routeProvider
        .when('/',
            {
                controller: 'HomeController',
                templateUrl: '/WebSite/Home/Home.html'

            })

        .when('/ErrorComment',
            {
                controller: 'BlogCtrl',
                templateUrl: '/app/Blog/ErrorComment.html'

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
        .when('/Advertisement',
            {
                controller: 'AdvertisementController',
                templateUrl: '/WebSite/Messages/Advertisement.html'

            })

        .when('/About',
            {
                controller: 'AboutController',
                templateUrl: '/WebSite/About/AboutUs.html'

            })
        .when('/FanClubs/GroupFansByBirthdate',
            {
                controller: 'FanClubsCtrl',
                templateUrl: '/app/FanClubs/GroupFansByBirthdate.html'

            })
        .when('/Screens/GroupScreensByCity',
            {
                controller: 'ScreensController',
                templateUrl: '/WebSite/Screens/GroupScreensByCity.html'

            })
        .when('/Admin',
            {
                controller: 'AdminCtrl',
                templateUrl: '/app/Admin/Admin.html'

            })
        .when('/Admin/CreatePost',
            {
                controller: 'AdminCtrl',
                templateUrl: '/app/Admin/CreatePost.html'

            })
        .when('/Admin/edit',
            {
                controller: 'AdminCtrl',
                templateUrl: '/app/Admin/EditPost.html'

            })
        .when('/Admin/Details',
            {
                controller: 'AdminCtrl',
                templateUrl: '/app/Admin/DetailsPost.html'

            })
        .when('/Admin/CommentsPerPost/:postId',
            {
                controller: 'CommentPerPostCtrl',
                templateUrl: '/app/Admin/CommentsPerPost.html'

            })
        .when('/Branches',
            {
                controller: 'BranchesCtrl',
                templateUrl: '/app/Branches/Branches.html'

            })
        .when('/Comments',
            {
                controller: 'CommentsCtrl',
                templateUrl: '/app/Comments/Comments.html'
            })
        .when('/Comments/create',
            {
                controller: 'CommentsCtrl',
                templateUrl: '/app/Comments/CreateComment.html'

            })
        .when('/Comments/edit',
            {
                controller: 'CommentsCtrl',
                templateUrl: '/app/Comments/EditComment.html'

            })
        .when('/Comments/details',
            {
                controller: 'CommentsCtrl',
                templateUrl: '/app/Comments/DetailsComment.html'

            })
        .otherwise({redirectTo:'/'});
}]);