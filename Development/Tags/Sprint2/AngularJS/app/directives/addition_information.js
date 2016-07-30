define(['./module'], function(directives) {
    'use strict';
    directives.directive('additionInformationSection', ['$parse', function($parse) {
        return {
            restrict: 'E',
            templateUrl: 'templates/addition_information.html',
            controller: "additionInformationController",
            controllerAs: 'additionInforCtrl',
            bindToController: true
        }
    }]);
});