/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./app', 'angular-route'], function(app) {
    'use strict'
    return app.config(['$locationProvider', '$routeProvider', '$httpProvider',

        function($locationProvider, $routeProvider, $httpProvider) {
            // $locationProvider.hashPrefix('!')
            //   $httpProvider.defaults.useXDomain = true
            $httpProvider.interceptors.push('authInterceptorService')
            $routeProvider.when('/', {
                redirectTo: '/search'
            })
            $routeProvider.when('/login', {
                templateUrl: '../views/home/login.html',
                controller: 'accountController',
                controllerAs: 'accountCtrl'

            })

            $routeProvider.when('/resetpassword', {
                templateUrl: '../views/home/reset_password.html',
                controller: 'resetPasswordController',
                controllerAs: 'resetCtrl'
            })
            $routeProvider.when('/logout', {
                templateUrl: '../views/home/logout.html',
                controller: 'homeController',
            })
            $routeProvider.when('/404', {
                templateUrl: '../views/home/404.html',
                controller: 'homeController',
            })
            $routeProvider.when('/employees/:user_id', {
                templateUrl: '../views/employee/edit_employee.html',
                controller: 'editEmployeeController',
                controllerAs: 'editEmpCtrl',
                resolve: {
                    validation: function($q, $route) {
                        var deferred = $q.defer()
                        var user_id = parseInt($route.current.params.user_id, 10)
                            // if user_id in URL is not just a integer, we will reject it
                        if (user_id.toString() !== $route.current.params.user_id) {
                            deferred.reject('VALIDATION FAILED')
                        } else {
                            if (!isNaN(user_id)) {
                                deferred.resolve()
                            } else {
                                deferred.reject('VALIDATION FAILED')
                            }
                        }
                        return deferred.promise
                    }
                },
            })

            $routeProvider.when('/projects/:project_id', {
                templateUrl: '../views/project/edit_project.html',
                controller: 'editProjectController',
                controllerAs: 'editProCtrl',
                resolve: {
                    validation: function($q, $route) {
                        var deferred = $q.defer()
                        var project_id = parseInt($route.current.params.project_id, 10)
                            // if user_id in URL is not just a integer, we will reject it
                        if (project_id.toString() !== $route.current.params.project_id) {
                            deferred.reject('VALIDATION FAILED')
                        } else {
                            if (!isNaN(project_id)) {
                                deferred.resolve()
                            } else {
                                deferred.reject('VALIDATION FAILED')
                            }
                        }
                        return deferred.promise
                    }
                },
            })

            $routeProvider.when('/search', {
                templateUrl: '../views/search/search.html',
                controller: 'searchController',
                controllerAs: 'vm'
            })

            $routeProvider.otherwise({
                redirectTo: '/404'
            })
        }
    ]).run(run)

    function run($rootScope, $location, $cookieStore) {
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login', '/resetpassword', '/logout']) === -1
            var loggedIn = $cookieStore.get('globals_tms') || false

            if (JSON.parse(localStorage.getItem('globals_tms'))) {
                loggedIn = true
                    // Loading page from closed brower at the first time.
                if (localStorage.getItem('globals_tms') && !$cookieStore.get('globals_tms')) {
                    // $location.path('/search')
                    // copy all data from localStorage to $cookieStore
                    $cookieStore.put('globals_tms', JSON.parse(localStorage.getItem('globals_tms')))
                }
            }
            if ($rootScope.remember == true)
                loggedIn = JSON.parse(localStorage.getItem('globals_tms')) || false
            if (restrictedPage && !loggedIn) {
                $location.path('/login')
            }
            if (!restrictedPage && loggedIn) {
                $location.path('/search')
            }
        })
        $rootScope.$on('$routeChangeError', function(ev, current, previous, rejection) {
            if (rejection === 'VALIDATION FAILED') {
                // window.location.reload()
                $location.path('/404')
            }
        })
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore']
})