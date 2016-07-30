define(['./module','config', 'ui-bootstrap'], function(controllers, config) {
    'use strict';
    controllers.controller("resetPasswordController", ['$scope', '$http', '$location', '$window', function($scope, $http, $location, $window) {
        $scope.mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        $scope.user = {
            username: 'admin',
            email: 'nguyenquoctrinhctt3@gmail.com',
        };
        $scope.error = '';
        // click on show button
        $scope.submit = function() {
            //console.log($scope.user);
            $location.path('/login');
            $http.post(config.api_server + '/account/resetpassword', $scope.user) // waiting for data from server
                .success(function(data, status, headers, config) {
                    //   console.log("Successed");
                    if (data != undefined && data !== null) {
                        $location.path('/login');
                        alert("Your new password has been sent, please check you email and log in to TMS.");
                    }
                    $scope.error = "Invalid username or email, please reset your password angain!";
                })
                .error(function(data, status, headers, config) {
                    console.log("error - CAN NOT FIND A RECORD !");
                    alert("Invalid username or email, please reset your password angain!");
                    $scope.error = "Invalid username or email, please reset your password angain!";
                    $location.path('/resetpassword');

                });
        };

    }]);
})