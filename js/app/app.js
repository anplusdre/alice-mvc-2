/// <reference path="js/angular.js" />
(function () {

    var alice = angular.module('alice', ['ngRoute', 'angular-loading-bar', 'angular-carousel', 'ngTouch', 'angular-carousel.shifty', 'ngCookies', 'xeditable', 'ui.bootstrap']).
    config(['$locationProvider', '$routeProvider', 'cfpLoadingBarProvider', function ($locationProvider, $routeProvider, cfpLoadingBarProvider) {
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
            when('/cart', {
                templateUrl: 'view/cart.html'
            }).
            when('/login', {
                templateUrl: 'view/login.html',
                controller: 'loginCtrl'
            }).
            when('/user-login', {
                templateUrl: 'view/user-login.html',
                controller: 'userlgnCtrl'
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
                            $location.path('/user-login');
                        }
                    },
                },
                templateUrl: 'view/client.html',
                controller: 'clientCtrl'
            }).
            when('/dashboard', {
                resolve: {
                    check: function ($location, userid) {
                        if (!userid.isUserLoggedIn()) {
                            $location.path('/login');
                        }
                    },
                },
                templateUrl: 'view/dashboard.html',
                controller: 'dsbCtrl'
            }).
            otherwise('/');

            cfpLoadingBarProvider.latencyThreshold = 1;
            cfpLoadingBarProvider.includeSpinner = false;
            $locationProvider.html5Mode(true);
    }])
        //        .factory("cartService", function () {
        //            var callbacks = [];
        //            var items = 0;
        //            var name = 'empty';
        //            var addItemToCart = function (item) {
        //                items++;
        //                //notify if there are any listeners
        //                var i = 0;
        //                for (i = 0; i < callbacks.length; i++)
        //                    callbacks[i](items);
        //
        //            }
        //
        //            //register listener
        //            var onItemsAdded = function (callback) {
        //                callbacks.push(callback);
        //            }
        //
        //            var removeItem = function (item) {
        //                var index = callbacks.indexOf(callbacks);
        //                callbacks.splice(index, 1);
        //            };
        //
        //            return {
        //                onItemsAdded: onItemsAdded,
        //                addItemToCart: addItemToCart
        //            }
        //
        //        })

        .controller('AliceController', ['$scope', '$http', '$location', '$cookies', function ($scope, $http, $location, $cookies) {
            //            this is where the JSON from api.php is consumed
            $http.get('api.php').
            then(function (res) {
                // here the data from the api is assigned to a variable named users
                $scope.talents = res.data.talents;
                $scope.open = false;
                // cart
                $scope.isNumber = $scope.total > 1;
                $scope.cart = [];
                $scope.total = 0;
                //                $scope.addToCart = cartService.addItemToCart;
                //                //subscribe items added callback
                //                cartService.onItemsAdded(function (items) {
                //                    $scope.cartItems = items;
                //                });

                //Sepetimiz daha önceden tanımlıysa onu çekelim
                if (!angular.isUndefined($cookies.get('total'))) {
                    $scope.total = parseFloat($cookies.get('total'));
                }
                //Sepetimiz daha önceden tanımlıysa onu çekelim
                if (!angular.isUndefined($cookies.get('cart'))) {
                    $scope.cart = $cookies.getObject('cart');
                }
                $scope.addItemToCart = function (talent) {


                    if ($scope.cart.length === 0) {
                        talent.count = 1;
                        $scope.cart.push(talent);
                    } else {
                        var repeat = false;
                        for (var i = 0; i < $scope.cart.length; i++) {
                            if ($scope.cart[i].id === talent.id) {
                                repeat = true;
                                $scope.cart[i].count - 1;
                            }
                        }
                        if (!repeat) {
                            talent.count = 1;
                            $scope.cart.push(talent);
                        }
                    }
                    var expireDate = new Date();
                    expireDate.setDate(expireDate.getDate() + 1);
                    $cookies.putObject('cart', $scope.cart, {
                        'expires': expireDate
                    });
                    $scope.cart = $cookies.getObject('cart');

                    $cookies.put('total', $scope.total, {
                        'expires': expireDate
                    });
                };

                $scope.removeItemCart = function (talent) {

                    if (talent.count > 1) {
                        talent.count -= 1;
                        var expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 1);
                        $cookies.putObject('cart', $scope.cart, {
                            'expires': expireDate
                        });
                        $scope.cart = $cookies.getObject('cart');
                    } else if (talent.count === 1) {
                        var index = $scope.cart.indexOf(talent);
                        $scope.cart.splice(index, 1);
                        expireDate = new Date();
                        expireDate.setDate(expireDate.getDate() + 1);
                        $cookies.putObject('cart', $scope.cart, {
                            'expires': expireDate
                        });
                        $scope.cart = $cookies.getObject('cart');

                    }

                    $cookies.put('total', $scope.total, {
                        'expires': expireDate
                    });

                };
                $scope.totalItem = function () {
                    return $scope.cart.map(function (x) {
                        return +x.count;
                    }).reduce(function (a, b) {
                        return a + b;
                    }, 0);
                }

                $scope.goToLogin = function () {
                    $location.path('/login')
                };

                $scope.goToUserLogin = function () {
                    $location.path('/user-login')
                };
            });




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
    //    alice.controller("cartCtrl", ['$scope', '
    //    cartService ', function ($scope, cartService) {
    //        $scope.totalItems = 0;
    //        $scope.itemsNames = 'empty';
    //        //subscribe items added callback
    //        cartService.onItemsAdded(function (items, name) {
    //            $scope.totalItems = items;
    //            $scope.itemsNames = name;
    //        });
    //
    //        }]);

    alice.run(function (editableOptions) {
        editableOptions.theme = 'bs3';
    });
    alice.controller("cartCtrl", ['$scope', function ($scope) {
        $scope.events = {
            name: 'your name',
            email: 'your email',
            contact: 'your phone number',
            company: 'your company name',
            ename: 'project name',
            elocation: 'project location',
            eaddress: 'project address',
            dob: new Date(2017, 12, 01),
            dobe: new Date(2018, 01, 01),
            estart: 'project start date',
            eend: 'project end date',
            fee: 'project fees (per day)'

        }

        $scope.opened = {};

        $scope.open = function ($event, elementOpened) {
            $event.preventDefault();
            $event.stopPropagation();

            $scope.opened[elementOpened] = !$scope.opened[elementOpened];
        };
    }]);
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
    alice.controller('CartController', function ($scope, productService) {
        $scope.products = productService.getProducts();
    });

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
    alice.service('userid', function () {
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
    alice.controller('userlgnCtrl', ['$scope', '$http', '$location', 'user', function ($scope, $http, $location, user) {
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
                }
                //                else if (username !== 0) {//
                //                    document.getElementById("invaliduser").innerHTML = "*Invalid Username or Key";
                //                    document.getElementById('users').className += ' invalidpass';
                else {
                    document.getElementById("invalid").innerHTML = "*Invalid Key";
                    document.getElementById('pass').className += ' invalidpass';
                }
            })

        }
        }]);

    alice.controller('loginCtrl', ['$scope', '$http', '$location', 'userid', function ($scope, $http, $location, userid) {
        $scope.loginus = function () {
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
                    userid.saveData(res.data);
                    $location.path('/dashboard');
                }
                //                else if (username !== 0) {//
                //                    document.getElementById("invaliduser").innerHTML = "*Invalid Username or Key";
                //                    document.getElementById('users').className += ' invalidpass';
                else {
                    document.getElementById("invalid").innerHTML = "*Invalid Key";
                    document.getElementById('pass').className += ' invalidpass';
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

    alice.controller("dsbCtrl", ['$scope', '$http', '$routeParams', 'userid', function ($scope, $http, $routeParams, userid) {


        $scope.user = userid.getName();
    }]);




})();
