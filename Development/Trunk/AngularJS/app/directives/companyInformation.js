define(['./module'], function (directives) {
    'use strict';
    directives.directive('companyInformation', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/companyInformation.html',
            controller: "companyInformationController",
            controllerAs: 'comInfoCtrl',
            bindToController: true
        }
    });
});