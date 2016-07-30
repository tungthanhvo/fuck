define(['./module', 'ui-bootstrap'], function(controllers) {
    'use strict';
    controllers.controller("additionInformationController", ['toastr', '$scope', 'addition_informationService', function(toastr, $scope, addition_informationService) {
        var self = this;
        self.user_id = $scope.editEmpCtrl.user_id;
        self.addition_information = null;
        self.addition_information_update = null;
        self.alerts = {
            "update": function() {
                toastr.success('Update additional information successfully.', 'TMS');
            }
        };

        function callAlert(alert) {
            self.alerts[alert]();
        }

        self.get = function() {
            addition_informationService.retrieveAdditionInformationByUser_Id(self.user_id).then(function(res) {
                self.addition_information = angular.copy(res.data.data);
                self.addition_information_update = angular.copy(res.data.data);
            });
        };
        self.get();
        self.save = function() {
            //if (self.addition_information_update.yahoo_id !== undefined) {

           // }
            addition_informationService.update(self.addition_information_update).then(function(res) {
                if (res.data.code === 200) {
                    self.addition_information = angular.copy(self.addition_information_update);
                    callAlert("update");
                    $scope.additionInforForm.$setPristine();
                }
            });
        }
        self.cancel = function() {
            self.addition_information_update = angular.copy(self.addition_information);
            // update arrow icon
            $scope.editEmpCtrl.isAdditionalCollapseEdit = !$scope.editEmpCtrl.isAdditionalCollapseEdit;
        };
    }]);
})