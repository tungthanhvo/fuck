define(['./module', 'config'], function(services, config) {
    'use strict'
    services.factory('accountService', ['$http', '$cookieStore', '$location', 'jwtHelper', '$rootScope', function($http, $cookieStore, $location, jwtHelper, $rootScope) {
        $rootScope.remember = false
        var account_service = {}
        account_service.isLogin = function() {
            if ($rootScope.remember === true) {
                return localStorage.getItem('globals_tms')
            }
            return $cookieStore.get('globals_tms')
        }
        account_service.login = function(user_account) {
            $rootScope.remember = user_account.remember


            var url = config.api_server + '/account/login'
            return $http.post(url, JSON.stringify(user_account))
        }
        account_service.logout = function(user) {
            $http.defaults.headers.common.Authorization = ''
            $cookieStore.remove('globals_tms')
            if (JSON.parse(localStorage.getItem('globals_tms'))) {
                localStorage.removeItem('globals_tms')
            }
            if (localStorage.getItem('isSent')) {
                localStorage.removeItem('isSent');
            }

            if (localStorage.getItem('last_time_send_email')) {
                localStorage.removeItem('last_time_send_email');
            }
            $location.path('/logout')
        }
        account_service.getUser = function() {
            if ($cookieStore.get('globals_tms') !== undefined) {
                return $cookieStore.get('globals_tms').user
            }
            if ($rootScope.remember === true) {
                var localObj = JSON.parse(localStorage.getItem('globals_tms'))
                if (localObj !== undefined) {
                    return localObj.user
                }
            }
            return undefined
        }
        account_service.checkExpired = function() {
            var dataObj = new Date()
            if (dataObj.setDate(dataObj.getMinutes() + 0) > $cookieStore.get('globals_tms').expires) {
                $http.defaults.headers.common.Authorization = ''
                $cookieStore.remove('globals_tms')
                alert('came to checkExpired')
                $location.path('/logout')
                $location.path('/login')
            }
            if ($rootScope.remember === true) {
                if (dataObj.setDate(dataObj.getMinutes() + 0) > localStorage.getItem('globals_tms').expires) {
                    $http.defaults.headers.common.Authorization = ''
                    localStorage.removeItem('globals_tms')
                    alert('came to checkExpired')
                    $location.path('/logout')
                    $location.path('/login')
                }
            }
        }
        return account_service;
    }])
})