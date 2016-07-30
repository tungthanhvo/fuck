define(['./module', 'ui-bootstrap'], function(controllers) {
    'use strict';
    controllers.controller("headerBarController", ['$rootScope', '$uibModal', '$log', 'accountService', function($rootScope, $uibModal, $log, accountService) {
        var self = this;
        $rootScope.isLogin = accountService.isLogin();
        $rootScope.user = accountService.getUser();
        self.logOut = function() {
            $rootScope.isLogin = false;
            accountService.logout();
        }

        self.open = function(size) {
            var _this = this;
            var modalInstance = $uibModal.open({
                backdrop: 'static',
                animation: true,
                templateUrl: '../views/employee/popup_create_employee.html',
                controller: 'employeeInstanceController',
                controllerAs: 'emp',
                size: size,
                // resolve: {
                //     items: function() {
                //         return self.items;
                //     }
                // }
            });

            modalInstance.result.then(function(selectedItem) {
                self.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        };
    }]);
})