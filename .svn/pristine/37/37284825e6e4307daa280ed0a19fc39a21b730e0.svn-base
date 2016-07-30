define(['./module', 'config', 'ui-bootstrap'], function (controllers, config) {
    'use strict';
    controllers.controller("headerBarController", ['$rootScope', '$uibModal', '$log', 'accountService', '$http', '$location', '$scope', 
        function ($rootScope, $uibModal, $log, accountService, $http, $location, $scope) {
        var self = this;
        $rootScope.isLogin = accountService.isLogin();
        $rootScope.user = accountService.getUser();
        $rootScope.api_server = config.api_server;

        self.navigateSearch = function(type) {            
            if($location.path() !== '/search') {
                $rootScope.searchType = type;
                $location.path('/search');
            } else {
                $scope.$emit('changeSearchType', { type: type });
            }
        }

        self.logOut = function () {
            $rootScope.isLogin = false;
            accountService.logout();
        }        

        self.open = function (size) {
            var _this = this;
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                animation: true,
                templateUrl: '../views/employee/popup_create_employee.html',
                controller: 'employeeInstanceController',
                controllerAs: 'emp',
                size: size,
            });

            modalInstance.result.then(function (selectedItem) {
                self.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };

        self.open1 = function(size){
            var _this = this;
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                animation: true,
                templateUrl: '../views/project/popup_create_project.html',
                controller: 'projectInstanceController',
                controllerAs: 'project',
                size: size,
            });

            modalInstance.result.then(function (selectedItem) {
                self.selected = selectedItem;
            }, function () {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }]);
})