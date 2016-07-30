define(['./module'], function (directives) {
    'use strict';
    directives.directive('personalInformation', ['$parse', function ($parse) {
        return {
            restrict: 'E',
            templateUrl: 'templates/personalInformation.html',
            controller: "personalInformationController",
            controllerAs: 'perInfoCtrl',
            bindToController: true
        }
    }]);
});