define(['./module', 'ui-bootstrap'], function (controllers) {
    'use strict';
    controllers.controller("homeController", ['$scope', '$uibModal', '$log', 'accountService', '$location', function (scope, $uibModal, $log, accountService, location) {
        var vm = this;
        vm.metaData = {};
        vm.metaData.job_titles = [];
        vm.metaData.skills = [];
        vm.metaData.projects = [];
        vm.metaData.locations = [];
        vm.metaData.project_types = [];
        vm.metaData.project_statuses = [];
        vm.metaData.client_industries = [];

        vm.search = function () {
            if (location.path() == '/search') {
                scope.$broadcast('onSearch', {
                    text: vm.searchText
                });
            } else {
                vm.isSearch = true;
                location.path('/search');
            }
        }

        scope.$on('changeSearchType', function(event, obj) {
            scope.$broadcast('changeSearch', obj);
        });
    }]);
})