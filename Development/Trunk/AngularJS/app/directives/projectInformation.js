define(['./module'], function (directives) {
    'use strict';
    directives.directive('projectInformation', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/projectInformation.html',
            controller: "projectInformationController",
            controllerAs: 'proInfoCtrl',
            bindToController: true
        }
    });
});