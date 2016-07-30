define(['./module', 'ui-bootstrap'], function(controllers) {
    'use strict';
    controllers.controller("additionInformationController", ['$scope', 'addition_informationService', function($scope, addition_informationService) {
        var self = this;
        self.user_id = $scope.editEmpCtrl.user_id;
        self.addition_information = null;
        self.alerts = {
            "update": {
                type: 'success',
                msg: 'Addition Information has been updated'
            }
        };

        function callAlert(alert) {
            self.alert = alert;
            self.isshowalert = true;
        }

        self.closeAlert = function() {
            self.isshowalert = false;
        }
        self.get = function() {
            addition_informationService.retrieveAdditionInformationByUser_Id(self.user_id).then(function(res) {
                self.addition_information = res.data.data;
                self.original_addition_information = angular.copy(self.addition_information);
            });
        }
        self.get();
        self.save = function() {
            addition_informationService.update(self.addition_information).then(function(res) {
                if (res.data.code == 200) {
                    self.original_addition_information = angular.copy(self.addition_information);
                    callAlert(self.alerts["update"]);
                }
            });
        }
        self.cancel = function() {
            self.addition_information = angular.copy(self.original_addition_information);
        }
    }]);
})