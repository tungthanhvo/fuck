define(['./module'], function(directives) {
    'use strict';
    directives.directive('courseSection', ['$parse', function($parse) {
        return {
            restrict: 'E',
            templateUrl: 'templates/course.html',
            controller: "courseController",
            controllerAs: 'courseCtrl',
            bindToController: true
        }
    }]);
});