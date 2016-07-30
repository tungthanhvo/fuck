define(['./module'], function(directives) {
    'use strict';
    directives.directive('employeeHistorySection', ['$parse', function($parse) {
        return {
            restrict: 'E',
            templateUrl: 'templates/employee_history.html',
            controller: "employee_historyController",
            controllerAs: 'empHistoryCtrl',
            bindToController: true
        }
    }]);
});