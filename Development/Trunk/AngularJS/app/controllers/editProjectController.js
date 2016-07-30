define(['./module', 'config'], function (controllers, config) {
    'use strict';
    var apiServer = config.api_server;
    controllers.controller('editProjectController', ['$rootScope', '$scope', '$location', '$http', '$log', '$routeParams', 'employeeService', 'smoothScroll', 'exportCVService', function ($rootScope, $scope, $location, $http, $log, $routeParams, employeeService, smoothScroll, exportCVService) {
        // skeleton
        var _this = this;

        _this.project_id = $routeParams.project_id;

        _this.disableAnotherTab = false;

        _this.url = apiServer + '/apii/projects/export/' + _this.project_id + '/pdf';
    }]);
});