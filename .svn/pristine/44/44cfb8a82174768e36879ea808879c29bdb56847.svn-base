define(['./module', 'ui-bootstrap'], function(controllers) {
    'use strict';
    controllers.controller("homeController", ['$scope', '$uibModal', '$log', 'accountService', 'metadataService', '$location', function(scope, $uibModal, $log, accountService, metadataService, location) {
        var self = this;

        var vm = this;
        vm.metaData = {};
        vm.metaData.job_titles = [];
        vm.metaData.skills = [];
        vm.technical_skills = [];
        vm.search = function() {
            if (location.path() == '/search') {
                scope.$broadcast('onSearch', {
                    text: vm.searchText
                });
            } else {
                vm.isSearch = true;
                location.path('/search');
            }
        }

        metadataService.getMetadata().then(function(response) {
            response.data.job.forEach(function(item) {
                vm.metaData.job_titles.push(item.name);
            });
            response.data.skill.forEach(function(item) {
                vm.metaData.skills.push(item);
            });
        });

    }]);
})