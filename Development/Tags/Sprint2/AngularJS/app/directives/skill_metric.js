define(['./module'], function(directives) {
    'use strict';
    directives.directive('skillMetric', ['$parse', function($parse) {
        return {
            restrict: 'E',
            templateUrl: 'templates/skill_metric.html',
            controller: "skillMetricController",
            controllerAs: 'smCtrl',
            bindToController: true
        }
    }]);
});