define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('technicalSkillController', ['toastr', '$scope', '$http', '$log', '$routeParams', 'employeeService', function (toastr, $scope, $http, $log, $routeParams, employeeService) {

        var _this = this;

        _this.user_id = $scope.editEmpCtrl.user_id;

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
            _this.isShowalert = true;
        }

        _this.closeAlert = function () {
            _this.isShowalert = false;
        }

        _this.cancelUpdate = function () {
            // reset all values
            _this.techSkillsInfoUpdate.OS = _this.techSkillsInfo.OS;
            _this.techSkillsInfoUpdate.LANGUAGES = _this.techSkillsInfo.LANGUAGES;
            _this.techSkillsInfoUpdate.DATABASES = _this.techSkillsInfo.DATABASES;
            _this.techSkillsInfoUpdate.COMMSANDNETWORKS = _this.techSkillsInfo.COMMSANDNETWORKS;
            _this.techSkillsInfoUpdate.PACKAGES = _this.techSkillsInfo.PACKAGES;
            _this.techSkillsInfoUpdate.METHODOLOGIES = _this.techSkillsInfo.METHODOLOGIES;
            // update arrow icon
            $scope.editEmpCtrl.isTechnicalCollapseEdit = !$scope.editEmpCtrl.isTechnicalCollapseEdit;
            //reset $pristine
            $scope.technicalSkillInfoForm.$setPristine();
        };

        _this.technicalSkillInfoSubmit = function () {

            $log.debug('@@: ' + _this.techSkillsInfoUpdate);

            employeeService.updateTechnicalSkillForUser(_this.user_id, _this.techSkillsInfoUpdate).then(function (response) {

                // check if data vavalues not changes
                if (!isValueChange()) {
                    toastr.warning('Nothing changes to update.', 'TMS');
                    //reset $pristine
                    $scope.technicalSkillInfoForm.$setPristine();
                    return;
                }
                // otherwise data values changes to update
                if (response.data.code == "200") {
                    toastr.success('Update technical skill successfully.', 'TMS');
                    //assign latest techSkillsInfo
                    _this.techSkillsInfo.OS = _this.techSkillsInfoUpdate.OS;
                    _this.techSkillsInfo.LANGUAGES = _this.techSkillsInfoUpdate.LANGUAGES;
                    _this.techSkillsInfo.DATABASES = _this.techSkillsInfoUpdate.DATABASES;
                    _this.techSkillsInfo.COMMSANDNETWORKS = _this.techSkillsInfoUpdate.COMMSANDNETWORKS;
                    _this.techSkillsInfo.PACKAGES = _this.techSkillsInfoUpdate.PACKAGES;
                    _this.techSkillsInfo.METHODOLOGIES = _this.techSkillsInfoUpdate.METHODOLOGIES;
                    //reset $pristine
                    $scope.technicalSkillInfoForm.$setPristine();
                } else if (response.data.code == "400") {
                    //toastr.error('Update technical skill encountered error.', 'TMS');
                }
            });
        };

        var isValueChange = function () {
            if (_this.techSkillsInfoUpdate.OS != _this.techSkillsInfo.OS) {
                return true;
            }
            if (_this.techSkillsInfoUpdate.LANGUAGES != _this.techSkillsInfo.LANGUAGES) {
                return true;
            }
            if (_this.techSkillsInfoUpdate.DATABASES != _this.techSkillsInfo.DATABASES) {
                return true;
            }
            if (_this.techSkillsInfoUpdate.COMMSANDNETWORKS != _this.techSkillsInfo.COMMSANDNETWORKS) {
                return true;
            }
            if (_this.techSkillsInfoUpdate.PACKAGES != _this.techSkillsInfo.PACKAGES) {
                return true;
            }
            if (_this.techSkillsInfoUpdate.METHODOLOGIES != _this.techSkillsInfo.METHODOLOGIES) {
                return true;
            }
            // nothing changes
            return false;
        };

        _this.techSkillsInfo = {
            OS: "",
            LANGUAGES: "",
            DATABASES: "",
            COMMSANDNETWORKS: "",
            PACKAGES: "",
            METHODOLOGIES: ""
        };

        _this.techSkillsInfoUpdate = {
            OS: "",
            LANGUAGES: "",
            DATABASES: "",
            COMMSANDNETWORKS: "",
            PACKAGES: "",
            METHODOLOGIES: ""
        };

        var checkEqual = function (value) {
            if (value == '......................................................') {
                return true;
            } else {
                return false;
            }
        }

        employeeService.getTechnicalSkillForUser(_this.user_id).then(function (response) {
            _this.technicalSkills = response.data.data;

            $log.debug(_this.technicalSkills);

            if (_this.technicalSkills.length != 0) {
                for (var i = 0; i < _this.technicalSkills.length; i++) {
                    var t = _this.technicalSkills[i];
                    //process with t: technical skill
                    if ((t.technical_skill.name).toUpperCase() == "OS") {
                        _this.techSkillsInfo.OS = t.description;
                    }
                    if ((t.technical_skill.name).toUpperCase() == "LANGUAGES") {
                        _this.techSkillsInfo.LANGUAGES = t.description;
                    }
                    if ((t.technical_skill.name).toUpperCase() == "DATABASES") {
                        _this.techSkillsInfo.DATABASES = t.description;
                    }
                    if ((t.technical_skill.name).toUpperCase() == "METHODOLOGIES & TOOLS") {
                        _this.techSkillsInfo.METHODOLOGIES = t.description;
                    }
                    if ((t.technical_skill.name).toUpperCase() == "PACKAGES") {
                        _this.techSkillsInfo.PACKAGES = t.description;
                    }
                    if ((t.technical_skill.name).toUpperCase() == "COMMS & NETWORKS") {
                        _this.techSkillsInfo.COMMSANDNETWORKS = t.description;
                    }
                }
            } else {
                _this.techSkillsInfo.OS = "......................................................";
                _this.techSkillsInfo.LANGUAGES = "......................................................";
                _this.techSkillsInfo.DATABASES = "......................................................";
                _this.techSkillsInfo.COMMSANDNETWORKS = "......................................................";
                _this.techSkillsInfo.PACKAGES = "......................................................";
                _this.techSkillsInfo.METHODOLOGIES = "......................................................";
            }

            //assign techSkillsInfo to techSkillsInfoUpdate
            if (checkEqual(_this.techSkillsInfo.OS)) {
                _this.techSkillsInfoUpdate.OS = "";
            } else {
                _this.techSkillsInfoUpdate.OS = _this.techSkillsInfo.OS;
            }
            if (checkEqual(_this.techSkillsInfo.LANGUAGES)) {
                _this.techSkillsInfoUpdate.LANGUAGES = "";
            } else {
                _this.techSkillsInfoUpdate.LANGUAGES = _this.techSkillsInfo.LANGUAGES;
            }

            if (checkEqual(_this.techSkillsInfo.DATABASES)) {
                _this.techSkillsInfoUpdate.DATABASES = "";
            } else {
                _this.techSkillsInfoUpdate.DATABASES = _this.techSkillsInfo.DATABASES;
            }

            if (checkEqual(_this.techSkillsInfo.COMMSANDNETWORKS)) {
                _this.techSkillsInfoUpdate.COMMSANDNETWORKS = "";
            } else {
                _this.techSkillsInfoUpdate.COMMSANDNETWORKS = _this.techSkillsInfo.COMMSANDNETWORKS;
            }

            if (checkEqual(_this.techSkillsInfo.PACKAGES)) {
                _this.techSkillsInfoUpdate.PACKAGES = "";
            } else {
                _this.techSkillsInfoUpdate.PACKAGES = _this.techSkillsInfo.PACKAGES;
            }

            if (checkEqual(_this.techSkillsInfo.METHODOLOGIES)) {
                _this.techSkillsInfoUpdate.METHODOLOGIES = "";
            } else {
                _this.techSkillsInfoUpdate.METHODOLOGIES = _this.techSkillsInfo.METHODOLOGIES;
            }
        });
    }
    ]);
});