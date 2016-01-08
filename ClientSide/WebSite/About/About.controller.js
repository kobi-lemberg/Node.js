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

    /*Render edit page with specific screen details to update*/
    $rootScope.searchAdvertisment = function(){
            var name=$("#searchAdvertisementByName").val();
            var texts=$("#searchAdvertisementByTexts").val();
            var seconds=$("#searchAdvertisementBySeconds").val();
            var postData=({
                "name":name,
                "texts":texts,
                "seconds":seconds
            });
            console.log(name);
            console.log(texts);
            console.log(seconds);
            console.log("Post data="+postData)
            $.post('/searchMsg',postData,function(data){
                console.log(data);
                $("#searchAdvertisementByName").val("");
                $("#searchAdvertisementByTexts").val("");
                $("#searchAdvertisementBySeconds").val("");
                var t = (function(){
                    window.location.href = "/#/Advertisment/";
                    $("#Seconds-Hidden").val(seconds*1);
                });


            });
    }
});