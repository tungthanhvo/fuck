define(['./module', 'config'], function(controllers, config) {
    'use strict';
    var apiServer = config.api_server;
    controllers.controller('projectRoleController', ['projectService', '$rootScope', '$scope', '$location', '$http', '$log', '$routeParams', 'employeeService', 'smoothScroll', 'exportCVService', function(projectService, $rootScope, $scope, $location, $http, $log, $routeParams, employeeService, smoothScroll, exportCVService) {
        // skeleton
        var _this = this;

        // _this.project_id = $scope.editProCtrl.project_id;

        // _this.isViewMode = true;
        // _this.saveOrEditButton = "Edit";

        // _this.delete = function() {
        //     $location.path("#/search");
        // }

        // _this.edit = function() {
        //     _this.isViewMode = !_this.isViewMode;

        //     //change label for button
        //     if (_this.isViewMode) {
        //         _this.saveOrEditButton = "Edit";
        //     } else {
        //         _this.saveOrEditButton = "Save";
        //     }
        // }


    }]);
});