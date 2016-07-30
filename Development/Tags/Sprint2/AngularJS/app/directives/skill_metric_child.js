define(['./module'], function(directives) {
    'use strict';
    directives.directive('skillMetricChild', ['$parse', function($parse) {
        return {
            restrict: 'E',
            scope: {
                skillmetric: "="
            },
            templateUrl: 'templates/skill_metric_child.html',
            controller: "skillMetricChildController",
            controllerAs: 'smchildCtrl',
            bindToController: true
        }
    }]);
});