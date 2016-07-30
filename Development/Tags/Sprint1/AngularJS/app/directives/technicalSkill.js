define(['./module'], function (directives) {
    'use strict';
    directives.directive('technicalSkill', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/technicalSkill.html',
            controller: "technicalSkillController",
            controllerAs: 'techSkillCtrl',
            bindToController: true
        }
    });
});