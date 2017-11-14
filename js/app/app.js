/// <reference path="js/angular.js" />
(function () {

    var alice = angular
        .module('alice', ['ngRoute', 'angular-carousel', 'ngTouch', 'angular-carousel.shifty']).
    config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
            $routeProvider.
            when('/', {
                templateUrl: 'view/main.html',
                controller: 'AliceController'
            }).
            when('/details/:userID', {
                templateUrl: 'view/details.html',
                controller: 'detailsController'
            }).
            otherwise('/');

            $locationProvider.html5Mode(true);
    }])

        .controller('AliceController', ['$scope', '$http', function ($scope, $http) {
            $scope.quantity = 3;
            //            this is where the JSON from api.php is consumed
            $http.get('api.php').
            then(function (res) {
                // here the data from the api is assigned to a variable named users
                $scope.talents = res.data.talents;
                $scope.open = false;

            });
        }]);
    alice.controller("detailsController", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $http.get('api.php')
            .then(function (res) {
                $scope.talents = res.data.talents;
                $scope.which = $routeParams.userID;
            })
    }]);

})();
