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

        scope.$on('search', function (event, obj) {
            if (location.path() === '/search') {
                scope.$broadcast('onSearch', {
                    text: obj.text
                });
            } else {
                vm.isSearch = true;
                vm.searchText = obj.text
                location.path('/search');
            }
        });

        scope.$on('changeSearchType', function(event, obj) {
            scope.$broadcast('changeSearch', obj);
        });
    }]);
})