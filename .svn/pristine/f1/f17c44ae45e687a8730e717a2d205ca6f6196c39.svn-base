define(['./module'], function(controllers) {
    'use strict';
    //this is used to parse the profile
    function url_base64_decode(str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output); //polifyll https://github.com/davidchambers/Base64.js
    }

    controllers.controller("accountController", ['$rootScope', '$scope', '$http', '$cookieStore', 'accountService', '$location', function($rootScope, $scope, $http, $cookieStore, accountService, $location) {
        $scope.user = {
            username: 'admin',
            password: '975rXFLW',
            remember: false
        };
        $scope.error = '';
        $scope.isAuthenticated = false;
        $scope.submit = function() {
            accountService.login($scope.user)
                .success(function(data, status, headers, config) {
                    // If user has loged in to the system
                    $rootScope.isLogin = true;
                    $rootScope.user = data.user;
                    $scope.isAuthenticated = true;
                    $location.path('/search');
                    $cookieStore.put('globals_tms', data);
                })
                .error(function(data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    $scope.isAuthenticated = false;
                    $cookieStore.remove('globals_tms');
                    // Handle login errors here
                    $scope.error = 'Invalid user or password, Please log in again !';
                    $rootScope.isLogin = false;
                });
        };

        // click on logout button
        $scope.logout = function() {
            $scope.isAuthenticated = false;
            $rootScope.isLogin = false;
            // delete $window.cookieStore.token;globals_tms	
            $cookieStore.remove('globals_tms');
        };
    }]);

});