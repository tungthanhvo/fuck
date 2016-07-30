define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('technicalSkillController', ['$scope', '$http', '$log', '$routeParams', 'employeeService', function ($scope, $http, $log, $routeParams, employeeService) {

        var _this = this;

        _this.alerts = {
            "update": {
                type: 'success',
                msg: 'Technical Skill has been updated'
            },
            "error": {
                type: 'danger',
                msg: 'Update technical skill encounter error'
            }
        };

        function callAlert(alert) {
            _this.alert = alert;
            _this.isshowalert = true;
        }

        _this.closeAlert = function () {
            _this.isshowalert = false;
        }

        _this.user_id = $scope.editEmpCtrl.user_id;

        _this.os = "";
        _this.languages = "";
        _this.databases = "";
        _this.commsAndNetworks = "";
        _this.packages = "";
        _this.methodologies = "";

        _this.isSuccess = false;
        _this.isFailed = false;

        _this.technicalSkillInfoSubmit = function () {

            employeeService.updateTechnicalSkillForUser(_this.user_id, _this.os, _this.languages, _this.databases,
                _this.commsAndNetworks, _this.packages, _this.methodologies);

            callAlert(_this.alerts["update"]);

        };

        _this.isEmptyTechnicalSkills = false;

        employeeService.getTechnicalSkillForUser(_this.user_id).then(function (response) {
            _this.technicalSkills = response.data;

            if (_this.technicalSkills.length == 0) {
                _this.isEmptyTechnicalSkills = true;
            } else {

                _this.isEmptyTechnicalSkills = false;

                for (var i = 0; i < _this.technicalSkills.length; i++) {
                    var t = _this.technicalSkills[i];
                    if (t.technical_skill.name == 'OS') {
                        _this.os = t.description;
                    }

                    if (t.technical_skill.name == 'Languages') {
                        _this.languages = t.description;
                    }

                    if (t.technical_skill.name == 'Databases') {
                        _this.databases = t.description;
                    }

                    if (t.technical_skill.name == 'Comms And Networks') {
                        _this.commsAndNetworks = t.description;
                    }

                    if (t.technical_skill.name == 'Packages') {
                        _this.packages = t.description;
                    }

                    if (t.technical_skill.name == 'Methodologies') {
                        _this.methodologies = t.description;
                    }
                }
            }
        });
    }
    ]);
});