define(['./module', 'config'], function (controllers, config) {
    'use strict';
    var apiServer = config.api_server;
    controllers.controller('editProjectController', ['$rootScope', '$scope', '$location', '$http', '$log', '$routeParams', 'employeeService', 'smoothScroll', 'exportCVService', function ($rootScope, $scope, $location, $http, $log, $routeParams, employeeService, smoothScroll, exportCVService) {
        // skeleton
        var _this = this;

        // update for title project
        $scope.$emit('setTitle', {
            text: "Project: ABC"
        });

        _this.project_id = $routeParams.project_id;

        _this.disableAnotherTab = false;

    }]);
});