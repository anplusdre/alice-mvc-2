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
            when('/talents', {
                templateUrl: 'view/talents.html',
                controller: 'AliceController'
            }).
            when('/details/:userID', {
                templateUrl: 'view/details.html',
                controller: 'detailsController'
            }).
            when('/about', {
                templateUrl: 'view/about.html',
                controller: 'aboutController'
            }).when('/services', {
                templateUrl: 'view/services.html',
                controller: 'svcController'
            }).when('/project', {
                templateUrl: 'view/project.html',
                controller: 'prjController'
            }).when('/contact', {
                templateUrl: 'view/contact.html',
                controller: 'prjController'
            }).
            when('/login', {
                templateUrl: 'view/login.html',
                controller: 'loginCtrl'
            }).
            when('/logout', {
                resolve: {
                    deadResolve: function ($location, user) {
                        user.clearData();
                        $location.path('/');
                    }
                }
            }).
            when('/clientzone', {
                resolve: {
                    check: function ($location, user) {
                        if (!user.isUserLoggedIn()) {
                            $location.path('/login');
                        }
                    },
                },
                templateUrl: 'view/client.html',
                controller: 'clientCtrl'
            }).
            otherwise('/');

            $locationProvider.html5Mode(true);
    }])

        .controller('AliceController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

            $scope.quantity = 3;
            //            this is where the JSON from api.php is consumed
            $http.get('api.php').
            then(function (res) {
                // here the data from the api is assigned to a variable named users
                $scope.talents = res.data.talents;
                $scope.open = false;

            });
            $scope.goToLogin = function () {
                $location.path('/login')
            };
        }]).filter('searchMain', function () {
            return function (arr, searchString) {
                if (!searchString) {
                    return arr;
                }
                var result = [];
                searchString = searchString.toLowerCase();
                angular.forEach(arr, function (talent) {
                    if (talent.name.toLowerCase().indexOf(searchString) !== -1) {
                        result.push(talent);
                    }
                });
                return result;
            };
        });
    alice.controller("detailsController", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $http.get('api.php')
            .then(function (res) {
                $scope.talents = res.data.talents;
                $scope.which = $routeParams.userID;
            })
    }]);
    alice.controller("aboutController", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $http.get('api.php')
            .then(function (res) {
                $scope.talents = res.data.talents;
                $scope.which = $routeParams.userID;
            })
    }]);
    alice.controller("svcController", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $http.get('api.php')
            .then(function (res) {
                $scope.talents = res.data.talents;
                $scope.which = $routeParams.userID;
            })
    }]);
    alice.controller("prjController", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
        $http.get('api.php')
            .then(function (res) {
                $scope.talents = res.data.talents;
                $scope.which = $routeParams.userID;
            })
    }]);


    alice.service('user', function () {
        var username;
        var loggedin = false;
        var id;

        this.getName = function () {
            return username;
        };

        // SET UNIQUE ID
        this.setID = function (userID) {
            id = userID;
        };

        this.getID = function () {
            return id;
        };

        this.isUserLoggedIn = function () {
            if (!!localStorage.getItem('login')) {
                loggedin = true;
                var data = JSON.parse(localStorage.getItem('login'));
                username = data.username;
                id = data.id;
            }
            return loggedin;
        };

        this.saveData = function (data) {
            username = data.user;
            id = data.id;
            loggedin = true;
            localStorage.setItem('login', JSON.stringify({
                username: username,
                id: id
            }));
        };

        this.clearData = function () {
            localStorage.removeItem('login');
            username = "";
            id = "";
            loggedin = false;
        }

    });

    alice.controller('loginCtrl', ['$scope', '$http', '$location', 'user', function ($scope, $http, $location, user) {
        $scope.login = function () {
            var username = $scope.username;
            var password = $scope.password;
            $http({
                url: 'key.php',
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: 'username=' + username + '&password=' + password
            }).then(function (res) {
                if (res.data.status == 'loggedin') {
                    user.saveData(res.data);
                    $location.path('/clientzone');
                } else {
                    alert('Wrong Client Key');
                }
            })

        }
    }]);

    alice.controller("clientCtrl", ['$scope', '$http', '$routeParams', 'user', function ($scope, $http, $routeParams, user) {


        $scope.user = user.getName();
        $http.get('api.php')
            .then(function (res) {
                $scope.talents = res.data.talents;
                $scope.which = $routeParams.userID;
            });
    }]);




})();
