/**
 * Created by trinhnguyenq on 6/28/2016.
 */
define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory('accountService', ['$http', '$cookieStore', '$location', 'jwtHelper', function($http, $cookieStore, $location, jwtHelper) {
        var account_service = {};
        account_service.isLogin = function() {
            return $cookieStore.get('globals_tms');
        }
        account_service.login = function(user_account) {
            var url = config.api_server + '/account/login';
            return $http.post(url, JSON.stringify(user_account));
        }

        account_service.logout = function(user) {
            $http.defaults.headers.common.Authorization = '';
            $cookieStore.remove('globals_tms');
            //alert("You have loged out!");
            $location.path('/logout');
        }
        account_service.getUser = function() {
            if ($cookieStore.get('globals_tms') != undefined) {
                return $cookieStore.get('globals_tms').user;
            }
            return undefined;
        }
        account_service.checkExpired = function() {
            var isExired = jwtHelper.isTokenExpired($cookieStore.get('globals_tms').user);
            if (isExired) {
                $http.defaults.headers.common.Authorization = '';
                $cookieStore.remove('globals_tms');
                alert("Your token has expired, Please Log in again.");
                $location.path('/login');
            }
        }
        return account_service;
    }]);

});