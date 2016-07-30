define(['./module'], function(directives) {
    'use strict';
    directives.directive('projectMember', function() {
        return {
            restrict: 'E',
            templateUrl: 'templates/project_member.html',
            controller: "projectMemberController",
            controllerAs: 'proMemberCtrl',
            bindToController: true
        }
    });
});