define(['./module', 'config', 'ui-bootstrap'], function(controllers, config) {
    'use strict';
    controllers.controller("bread_crumbController", ['$rootScope', 'accountService', '$location', '$scope', '$timeout', function($rootScope, accountService, $location, $scope, $timeout) {
        var vm = this;
        vm.showTitle = true;
        var firstToUpperCase = function(str) {
            return str.substr(0, 1).toUpperCase() + str.substr(1);
        }
        var setBreadcrumb = function() {
            var url = $location.path();
            url = url.substr(1, url.length);
            var breads = url.split('/');
            var final = breads.length;
            if (!isNaN(breads[final - 1])) {
                breads.splice(-1, 1);
            }
            breads.forEach(function(item, index) {
                breads[index] = firstToUpperCase(breads[index]);
            });
            vm.breads = breads;
        };
        setBreadcrumb();
        $rootScope.isLogin = accountService.isLogin();
        $rootScope.$on('$locationChangeStart', function(event, next, current) {
            vm.showTitle = false;
            setBreadcrumb();
        });
        $scope.$on('setTitle', function(event, obj) {
            vm.showTitle = false;
            vm.title = obj.text;
            vm.content_title = "";
            if (vm.title.split(":").length > 1) {
                vm.content_title = vm.title.split(":")[1];
            }

            $timeout(function() {
                vm.showTitle = true;
            });
        });
    }]);
})