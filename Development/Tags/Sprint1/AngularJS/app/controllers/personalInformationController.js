define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('personalInformationController', ['$scope', '$http', '$log', '$routeParams', 'employeeService','$uibModal', function ($scope, $http, $log, $routeParams, employeeService,$uibModal) {

        var _this = this;

        _this.alerts = {
            "update": {
                type: 'success',
                msg: 'PersonalInformation has been updated'
            },
            "error": {
                type: 'danger',
                msg: 'PersonalInformation has been removed'
            }
        };

        function callAlert(alert) {
            _this.alert = alert;
            _this.isshowalert = true;
        }

        _this.closeAlert = function() {
            _this.isshowalert = false;
        }

        _this.user_id = $scope.editEmpCtrl.user_id;

        _this.isMarialSelected = true;
        _this.isValidDOB = true;

        _this.isCountrySelected = true;
        _this.isNationalitySelected = true;


        function parseDate(date) {
            var res = "";
            var currentdate = new Date(date);
            var digitalmonth = ((currentdate.getMonth() + 1) >= 10) ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1);
            var digitaldate = ((currentdate.getDate()) >= 10) ? (currentdate.getDate()) : '0' + (currentdate.getDate());
            res = currentdate.getFullYear() + "/" + digitalmonth + "/" + digitaldate;
            return new Date(res);
        }

        // _this.user_id, _this.firstName, _this.lastName, _this.nickName,
        //     _this.status, _this.gender, _this.dob, _this.country,
        //     _this.nationality, _this.address, _this.mobile, _this.email


        employeeService.getUserInfo(_this.user_id).then(function (response) {
            _this.userInfo = response.data;

            _this.firstName = _this.userInfo.first_name;
            _this.lastName = _this.userInfo.last_name;
            _this.nickName = _this.userInfo.nickname;
            _this.status = _this.userInfo.married_status;
            _this.gender = _this.userInfo.gender;
            _this.dob = parseDate(_this.userInfo.dob);
            _this.country = _this.userInfo.country_code;
            _this.nationality = _this.userInfo.nationality_code;
            _this.address = _this.userInfo.address;
            _this.mobile = _this.userInfo.mobile;
            _this.email = _this.userInfo.personal_email;

            employeeService.getUserInfo(_this.userInfo.line_manager_id).then(function (response) {
                _this.line_manager_name = response.data.first_name + ' ' + response.data.last_name;
            });

            employeeService.getInfo(_this.userInfo.competence_job_title_id).then(function (response) {
                var _competenceID = response.data.competence_id;
                var _jobTitleID = response.data.job_title_id;

                employeeService.getCompetence(_competenceID).then(function (response) {
                    _this.competence_name = response.data.name;

                    var _departmentID = response.data.department_id;

                    employeeService.getDepartmentByID(_departmentID).then(function (response) {
                        _this.department_name = response.data.name;
                    });
                });

                employeeService.getJobtitle(_jobTitleID).then(function (response) {
                    _this.job_title_name = response.data.name;
                });

            });

        });


        _this.isSuccess = false;

        _this.personalInfoSubmit = function () {
            if (_this.status == -1) {
                _this.isMarialSelected = false;
                return;
            }

            if (_this.dob == null) {
                _this.isValidDOB = false;
                return;
            }

            if (_this.country == undefined || _this.nationality == undefined) {
                _this.isCountrySelected = false;
                _this.isNationalitySelected = false;
                return;
            }

            employeeService.updatePersonalInformationForUser(_this.user_id, _this.firstName, _this.lastName, _this.nickName,
                _this.status, _this.gender, _this.dob, _this.country,
                _this.nationality, _this.address, _this.mobile, _this.email).then(function (response) {
                if (response.data.code == '404') {
                    callAlert(_this.alerts["error"]);
                } else if (response.data.code == '200') {
                    callAlert(_this.alerts["update"]);
                }
            });
        };

        _this.statusChange = function () {
            if (_this.status == -1) {
                _this.isMarialSelected = false;
            } else {
                _this.isMarialSelected = true;
            }
        };

        _this.nationalityChange = function () {
            if (_this.nationality != undefined) {
                _this.isNationalitySelected = true;
            }
        };

        _this.countryChange = function () {
            if (_this.country != undefined) {
                _this.isCountrySelected = true;
            }
        };

    }]);
});