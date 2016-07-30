define(['./module', 'config', 'ui-bootstrap'], function(controllers, config) {
    'use strict'
    controllers.controller('resetPasswordController', ['$scope', '$http', '$location', '$window', '$uibModal', 'resetPasswordService', function($scope, $http, $location, $window, $uibModal, resetPasswordService) {

        var _this = this;

        _this.mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@(harveynash.vn|nashtech.com)?$/i
        _this.user = {
            username: '',
            email: '',
        };
        _this.error = '';
        _this.isSuccess = false;



        if (localStorage.getItem('isSent')) {
            // DOSOMETHING
        } else {
            localStorage.setItem('isSent', 'false');
        }

        function sendMail(newLastTime) {
            _this.info = "Please wait for a moment, sending...";
            _this.error = "";
            // set 2 minutes for resend email.
            localStorage.setItem('last_time_send_email', newLastTime.setDate(newLastTime.getMinutes() + 2).toString());
            // send email
            $http.post(config.api_server + '/account/resetpassword', _this.user) // waiting for data from server
                .success(function(data, status, headers, config) {
                    _this.info = "";
                    localStorage.setItem('isSent', 'true');
                    if (data != undefined && data != null) {
                        _this.isSuccess = true;
                    }
                })
                .error(function(data, status, headers, config) {
                    _this.info = '';
                    _this.isSuccess = false;
                    _this.error = 'The username and the company email address do not match. Please try again.'
                    localStorage.setItem('isSent', 'false');
                    $location.path('/resetpassword')
                })
        }
        // click on submit button
        _this.submit = function() {
            var newLastTime = new Date();
            if (localStorage.getItem('last_time_send_email')) {
                var oldLastTime = JSON.parse(localStorage.getItem('last_time_send_email'));
                if (oldLastTime > newLastTime.setDate(newLastTime.getMinutes()) && localStorage.getItem('isSent') == 'true') {
                    _this.error = 'Please wait for a moment to send another email, you have just sent an email.';
                    return;
                } else {
                    sendMail(newLastTime);
                }
            } else {
                sendMail(newLastTime);
            }
        }
    }])
})