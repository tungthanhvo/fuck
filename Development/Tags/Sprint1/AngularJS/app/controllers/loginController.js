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

    controllers.controller("loginController", ['$scope', '$http', '$window', function($scope, $http, $window) {


        $scope.user = {
            username: 'admin',
            password: 'admin',
            remember: false
        };
        $scope.isAuthenticated = false;
        $scope.welcome = 'Hello';
        $scope.message = '';

        $scope.submit = function() {
            console.log($scope.user);

            $http.post('http://localhost:8080/authenticate', $scope.user) // waiting for data from server

            .success(function(data, status, headers, config) {
                    $window.sessionStorage.token = data.token;
                    $scope.isAuthenticated = true;
                    console.log(data.token);
                    var encodedUser = data.token.split('.')[1];
                    console.log(encodedUser);
                    var profile = JSON.parse(url_base64_decode(encodedUser));
                    console.log(typeof(profile));
                    console.log(profile);
                    console.log(profile.first_name);


                    var header_jwt = JSON.parse(url_base64_decode(data.token.split('.')[0]))
                        //var verifySign = JSON.parse(url_base64_decode(data.token.split('.')[2]))
                        // is not a json type -> can not parse
                    console.log(header_jwt);

                    $scope.welcome = 'Welcome ' + profile.first_name + ' ' + profile.last_name + ' with role: ' + profile.role_id;
                    console.log($scope.isAuthenticated);

                    $window.location.href = '?#/editemployee';
                })
                .error(function(data, status, headers, config) {
                    // Erase the token if the user fails to log in
                    delete $window.sessionStorage.token;
                    $scope.isAuthenticated = false;

                    // Handle login errors here
                    $scope.error = 'Error: Invalid user or password';
                    //$scope.welcome = '';
                });
        };

        // click on logout button
        $scope.logout = function() {
            $scope.welcome = '';
            $scope.message = '';
            $scope.isAuthenticated = false;
            delete $window.sessionStorage.token;
        };
        // click on show button
        $scope.callRestricted = function() {
            console.log($scope.isAuthenticated);
            $http.get("http://localhost:8080/api/restricted")
                .success(function(data, status, headers, config) {
                    $scope.message = $scope.message + ' ' + data.name; // Should log 'called'
                })
                .error(function(data, status, headers, config) {
                    alert(data);
                });
        };
        // // in controller
        $scope.init = function() {
            //     // check if there is query in url
            //     // and fire search in case its value is not empty
            //     if ($scope.isAuthenticated == true) {
            //         console.log($scope.isAuthenticated);
            //         $window.location.href = '?#/editemployee';
            //     }
        };
    }]);

});