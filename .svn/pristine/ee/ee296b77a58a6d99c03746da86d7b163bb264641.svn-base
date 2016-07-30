define(['./module'], function(controllers) {
    'use strict';
    controllers.controller('deleteController', ['$scope', '$uibModalInstance', 'content_modal', function EducationController($scope, $uibModalInstance, content_modal) {
        var self = $scope;
        self.content_modal = content_modal;
        self.yes = function() {
            $uibModalInstance.close();
        }
        self.no = function() {
            $uibModalInstance.dismiss('cancel');
        };

    }]);
});