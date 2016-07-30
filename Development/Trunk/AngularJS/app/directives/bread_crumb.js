define(['./module'], function(directives) {
    'use strict';
    directives.directive('breadCrumb', ['$parse', function($parse) {
        return {
            restrict: 'E',
            templateUrl: 'templates/bread_crumb.html',
            controller: "bread_crumbController",
            controllerAs: 'brcbCtrl',
            bindToController: true
        }
    }]);
});