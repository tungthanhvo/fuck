define(['./module'], function(controllers) {
    'use strict'
    controllers.controller('accountController', ['$rootScope', '$scope', '$http', '$cookieStore', 'accountService', '$location', function($rootScope, $scope, $http, $cookieStore, accountService, $location) {
        var _this = this
        _this.user = {
            username: '',
            password: '',
            remember: false
        }
        if (localStorage.getItem('lastusername')) {
            _this.user.username = localStorage.getItem('lastusername')
        }
        if (localStorage.getItem('lastremember')) {
            localStorage.getItem('lastremember') == 'true'
            _this.user.remember = true
        }
        _this.error = ''
        _this.isAuthenticated = false
        _this.submit = function() {
            if (_this.user.remember == false && localStorage.getItem('lastusername'))
                localStorage.removeItem('lastusername')
            if (_this.user.remember == false && localStorage.getItem('lastremember'))
                localStorage.removeItem('lastremember')
            if (_this.user.username == '' || _this.user.password == '') {
                  angular.forEach($scope.LoginForm.$error.required, function(field) {
                    field.$setDirty();
                });
            } else {
                _this.error = ''
                accountService.login(_this.user)
                    .success(function(data, status, headers, config) {
                        // If user has loged in to the system
                        $rootScope.isLogin = true
                        $rootScope.user = data.user
                        _this.isAuthenticated = true
                        $location.path('/search')
                        if ($rootScope.remember == true) {
                            localStorage.setItem('globals_tms', JSON.stringify(data))
                            localStorage.setItem('lastusername', data.user.username)
                            localStorage.setItem('lastremember', data.user.remember)
                        }
                        $cookieStore.put('globals_tms', data)
                    })
                    .error(function(data, status, headers, config) {
                        // Erase the token if the user fails to log in
                        _this.isAuthenticated = false
                        $cookieStore.remove('globals_tms')
                        if ($rootScope.remember == true) {
                            localStorage.removeItem('globals_tms')
                        }
                        // Handle login errors here
                        _this.error = 'The Username or Password you entered is incorrect.'
                        $rootScope.isLogin = false
                    })
            }
        }
    }])
})