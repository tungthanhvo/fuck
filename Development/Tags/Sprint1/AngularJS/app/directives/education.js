define(['./module'], function(directives) {
    'use strict';
    directives.directive('educationSection', ['$parse', function($parse) {
        return {
            restrict: 'E',
            templateUrl: 'templates/education.html',
            controller: "educationController",
            controllerAs: 'eduCtrl',
            bindToController: true
        }
    }]);
});