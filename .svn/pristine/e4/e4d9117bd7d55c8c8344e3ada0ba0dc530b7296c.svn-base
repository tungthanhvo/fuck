define(['./module', 'config'], function(services, config) {
    'use strict'
    services.factory('authInterceptorService', ['$rootScope', '$q', '$cookieStore', 'jwtHelper', '$location', function($rootScope, $q, $cookieStore, jwtHelper, $location) {
        return {
            'request': function(config) {
                config.headers = config.headers || {}
                if ($rootScope.remember === true) {
                    var localObj = JSON.parse(localStorage.getItem('globals_tms'))
                    if (localObj) {
                        config.headers.Authorization = 'Bearer ' + localObj.token
                    }
                    return config
                }
                if ($cookieStore.get('globals_tms')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('globals_tms').token
                }
                return config
            },
            'requestError': function(rejection) {
                if (rejection.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return $q.reject(rejection)
            },
            'response': function(response) {
                var localObj = JSON.parse(localStorage.getItem('globals_tms'))
                var newexpires = (response.headers().newexpires)
                var newtoken = (response.headers().newtoken)
                var isexpired = (response.headers().isexpired)
                    // if token is expired
                if (isexpired === 'yes') {
                    if (localObj) {
                        localStorage.removeItem('globals_tms')
                        $cookieStore.remove('globals_tms')
                        if (localStorage.getItem('lastusername'))
                            localStorage.removeItem('lastusername')
                        if (localStorage.getItem('lastremember'))
                            localStorage.removeItem('lastremember')
                        window.location.reload();
                        $location.path('/login');
                    }
                    if ($cookieStore.get('globals_tms')) {
                        $cookieStore.remove('globals_tms')
                        window.location.reload();
                        $location.path('/login');
                    }
                } else { // set token again 
                    if (localObj) {
                        if (newexpires !== undefined) {
                            localObj.user.expires = newexpires
                            localObj.expires = newexpires
                        }
                        if (newtoken !== undefined) {
                            localObj.token = newtoken
                        }
                        localStorage.removeItem('globals_tms')
                        localStorage.setItem('globals_tms', JSON.stringify(localObj))
                    }
                    if ($cookieStore.get('globals_tms')) {
                        var cookObj = $cookieStore.get('globals_tms')
                        if (newexpires !== undefined) {
                            cookObj.user.expires = newexpires
                            cookObj.expires = newexpires
                        }
                        if (newtoken !== undefined) {
                            cookObj.token = newtoken
                        }
                        $cookieStore.remove('globals_tms')
                        $cookieStore.put('globals_tms', cookObj)
                    }
                }
                return response
            },
            'responseError': function(rejection) {
                return $q.reject(rejection)
            }
        }
    }])
})