/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./app', 'angular-route'], function(app) {
    'use strict';
    return app.config(['$locationProvider', '$routeProvider', '$httpProvider',
        function($locationProvider, $routeProvider, $httpProvider) {
            //$locationProvider.hashPrefix('!');
            $httpProvider.interceptors.push('authInterceptorService');

            //$httpProvider.interceptors;

            $routeProvider.when('/login', {
                templateUrl: '../views/home/login.html',
                controller: 'accountController'
            });
            $routeProvider.when('/resetpassword', {
                templateUrl: '../views/home/reset_password.html',
                controller: 'resetPasswordController'
            });
            $routeProvider.when('/logout', {
                templateUrl: '../views/home/logout.html',
                controller: 'homeController',
            });

            // $routeProvider.when('/home', {
            //     templateUrl: '../views/home/home.html',
            //     controller: 'homeController'
            // })

            $routeProvider.when('/employee/:user_id', {
                templateUrl: '../views/employee/edit_employee.html',
                controller: 'editEmployeeController',
                controllerAs: 'editEmpCtrl',
            });

            $routeProvider.when('/search', {
                templateUrl: '../views/search/search.html',
                controller: 'searchController',
                controllerAs: 'searchCtrl'
            });

            $routeProvider.otherwise({
                redirectTo: '/search'
            });
        }
    ]).run(run);

    function run($rootScope, $location, $cookieStore) {
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            var restrictedPage = $.inArray($location.path(), ['/login', '/resetpassword', '/logout']) === -1;

            // var loggedIn = $window.sessionStorage.token;
            var loggedIn = $cookieStore.get('globals_tms') || false;
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            }
            if (!restrictedPage && loggedIn) {
                $location.path('/home');
            }
        });
    }

    run.$inject = ['$rootScope', '$location', '$cookieStore'];
});