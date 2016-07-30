/**
 * Created by trinhnguyenq on 6/28/2016.
 */
define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory('authInterceptorService', ['$rootScope', '$q', '$cookieStore', 'jwtHelper', '$location', function($rootScope, $q, $cookieStore, jwtHelper, $location) {
        return {
            request: function(config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('globals_tms')) {
                    var isExired = jwtHelper.isTokenExpired($cookieStore.get('globals_tms').token);
                    var tokenPayload = jwtHelper.decodeToken($cookieStore.get('globals_tms').token);
                    //console.log(tokenPayload);
                    var expireDate = jwtHelper.getTokenExpirationDate($cookieStore.get('globals_tms').token);
                    //console.log(expireDate);

                    if (isExired) {
                        config.headers.Authorization = '';
                        $cookieStore.remove('globals_tms');
                        alert("Your token has expired, Please Log in again.");
                        $location.path('/login');
                        return config;
                    }
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('globals_tms').token;
                }
                return config;
            },
            responseError: function(rejection) {
                if (rejection.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return $q.reject(rejection);
            }
        };
    }]);

});