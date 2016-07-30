define(['./module'], function(directives) {
    'use strict';
    directives.directive('headerBar', ['$parse', function($parse) {
        return {
            restrict: 'E',
            templateUrl: 'templates/header_bar.html',
            controller: "headerBarController",
            controllerAs: 'hbCtrl',
            bindToController: true
        }
    }]);
});