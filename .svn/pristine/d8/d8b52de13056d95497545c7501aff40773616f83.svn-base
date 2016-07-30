define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('companyInformationController', ['toastr', '$scope', '$http', '$log', '$routeParams', '$uibModal', 'employeeService', function (toastr, $scope, $http, $log, $routeParams, $uibModal, employeeService) {

        var _this = this;

        _this.user_id = $scope.editEmpCtrl.user_id;
        _this.mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        _this.nameRegex = /^([^;!@#$%^&*():'"{}/*~`|\/\\?\-_+,\[\]]*)$/;

        /// bootstrap-ui-datepicker

        _this.today = function () {
            _this.dtt = new Date();
        };
        _this.today();

        _this.clear = function () {
            _this.dtt = null;
        };

        _this.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(),
            showWeeks: true
        };

        _this.dateOptions = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };


// Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        _this.toggleMin = function () {
            _this.inlineOptions.minDate = _this.inlineOptions.minDate ? null : new Date();
            _this.dateOptions.minDate = _this.inlineOptions.minDate;
        };

        _this.toggleMin();

        _this.open1 = function () {
            _this.popup1.opened = true;
        };

        _this.open2 = function () {
            _this.popup2.opened = true;
        };

        _this.setDate = function (year, month, day) {
            _this.dtt = new Date(year, month, day);
        };

        _this.formats = ['dd-MMM-yyyy'];
        _this.format = _this.formats[0];
        _this.altInputFormats = ['M!/d!/yyyy'];

        _this.popup1 = {
            opened: false
        };

        _this.popup2 = {
            opened: false
        };

        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);
        _this.events = [
            {
                date: tomorrow,
                status: 'full'
            },
            {
                date: afterTomorrow,
                status: 'partially'
            }
        ];

        function getDayClass(data) {
            var date = data.date,
                mode = data.mode;
            if (mode === 'day') {
                var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                for (var i = 0; i < _this.events.length; i++) {
                    var currentDay = new Date(_this.events[i].date).setHours(0, 0, 0, 0);

                    if (dayToCheck === currentDay) {
                        return _this.events[i].status;
                    }
                }
            }

            return '';
        }

        /// bootstrap-ui-datepicker


        _this.alerts = {
            "update": {
                type: 'success',
                msg: 'Company Information has been updated'
            },
            "error": {
                type: 'danger',
                msg: 'Update company information encounter error'
            }
        };

        function callAlert(alert) {
            _this.alert = alert;
            _this.isShowalert = true;
        }

        _this.closeAlert = function () {
            _this.isShowalert = false;
        }


        function parseDate(date) {
            var res = "";
            var currentdate = new Date(date);
            var digitalmonth = ((currentdate.getMonth() + 1) >= 10) ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1);
            var digitaldate = ((currentdate.getDate()) >= 10) ? (currentdate.getDate()) : '0' + (currentdate.getDate());
            res = currentdate.getFullYear() + "/" + digitalmonth + "/" + digitaldate;
            return new Date(res);
        }

        _this.isCompanyJoinDateInvalidWithCurrent = false;
        _this.isCompanyJoinDateInvalidWithDOB = false;
        _this.isCompanyEmailContainSpace = false;

        _this.company_email_change = function () {
            _this.isCompanyEmailExist = false;

            if (_this.userInfoUpdate.company_email != "" && _this.userInfoUpdate.company_email != null && _this.userInfoUpdate.company_email != undefined) {
                if (_this.userInfoUpdate.company_email.contains(" ")) {
                    _this.isCompanyEmailContainSpace = true;
                } else {
                    _this.isCompanyEmailContainSpace = false;
                }
            } else {
                _this.isCompanyEmailContainSpace = false;
            }
        };

        _this.company_join_date_change = function () {
            // check company_join_date whether greater than current time.
            employeeService.getUserInfo(_this.user_id).then(function (response) {
                var data = response.data.data;
                var now = new Date().getTime();
                var company = new Date(_this.userInfoUpdate.company_join_date).getTime();

                if (company > now) {
                    _this.isCompanyJoinDateInvalidWithCurrent = true;
                    return;
                } else {
                    _this.isCompanyJoinDateInvalidWithCurrent = false;
                }
                // check company_join_date whether enough 19 age.
                var validAge = 18 * 365 * 24 * 60 * 60 * 1000;
                var dob = new Date(data.dob).getTime();

                if ((company - dob) >= validAge) {
                    _this.isDOBInvalidWith18Age = false;
                } else {
                    _this.isDOBInvalidWith18Age = true;
                    return;
                }
            });
        };

        _this.companyInfoSubmit = function () {
            employeeService.getUserInfo(_this.user_id).then(function (response) {
                var data = response.data.data;
                var now = new Date().getTime();
                var company = new Date(_this.userInfoUpdate.company_join_date).getTime();

                if (company > now) {
                    _this.isCompanyJoinDateInvalidWithCurrent = true;
                    return;
                } else {
                    _this.isCompanyJoinDateInvalidWithCurrent = false;
                }

                var validAge = 18 * 365 * 24 * 60 * 60 * 1000;
                var dob = new Date(data.dob).getTime();

                if ((company - dob) >= validAge) {
                    _this.isDOBInvalidWith18Age = false;
                } else {
                    _this.isDOBInvalidWith18Age = true;
                    return;
                }

                if (_this.userInfoUpdate.company_email != "") {
                    if (_this.userInfoUpdate.company_email.contains(" ")) {
                        _this.isCompanyEmailContainSpace = true;
                        return;
                    } else {
                        _this.isCompanyEmailContainSpace = false;
                    }
                } else {
                    _this.isCompanyEmailContainSpace = false;
                }

                var _email = _this.userInfoUpdate.company_email + _this.userInfoUpdate.suffix_company_email;

                employeeService.checkCompanyEmailExist(_email).then(function (response) {

                    if (_this.userInfoUpdate.company_email == _this.userInfo.company_email) {
                        $log.debug('equal');
                    } else {
                        $log.debug('not equal');
                        if (response.data.data != null && response.data.data != undefined) {
                            // company_email already existed
                            _this.isCompanyEmailExist = true;
                            return;
                        }
                    }

                    employeeService.updateCompanyInformationForUser(_this.user_id, _this.userInfoUpdate).then(function (response) {

                        if (response.data.code != '200') {
                            toastr.error('Update company information encountered error.', 'TMS');
                        } else if (response.data.code == '200') {
                            toastr.success('Update Company Information successfully.', 'TMS');
                            _this.isCompanyEmailExist = false;
                            //auto-update EmpProfile
                            employeeService.getJobtitle(_this.userInfo.job_title_id).then(function (response) {
                                $scope.editEmpCtrl.job_title_name = response.data.data.name;
                            });


                            // assign userInfoUpdate to userInfo
                            _this.userInfo.department_id = _this.userInfoUpdate.department_id;
                            _this.userInfo.competence_id = _this.userInfoUpdate.competence_id;
                            _this.userInfo.job_title_id = _this.userInfoUpdate.job_title_id;
                            _this.userInfo.line_manager_id = _this.userInfoUpdate.line_manager_id;
                            _this.userInfo.company_join_date = parseDate(_this.userInfoUpdate.company_join_date);
                            _this.userInfo.company_email = _this.userInfoUpdate.company_email;
                            _this.userInfo.suffix_company_email = _this.userInfoUpdate.suffix_company_email;
                            _this.userInfo.skype_id = _this.userInfoUpdate.skype_id;
                            _this.userInfo.level = _this.userInfoUpdate.level;

                            // update data on view after update
                            employeeService.getUserInfo(_this.userInfo.line_manager_id).then(function (response) {
                                _this.line_manager_name = response.data.data.first_name + ' ' + response.data.data.last_name;
                            });

                            employeeService.getDepartmentByID(_this.userInfo.department_id).then(function (response) {
                                _this.department_name = response.data.data.name;
                            });

                            employeeService.getCompetence(_this.userInfo.competence_id).then(function (response) {
                                _this.competence_name = response.data.data.name;
                            });

                            employeeService.getJobtitle(_this.userInfo.job_title_id).then(function (response) {
                                _this.job_title_name = response.data.data.name;
                                $scope.editEmpCtrl.job_title_name = response.data.data.name;
                            });

                            $scope.editEmpCtrl.company_email = _this.userInfo.company_email + _this.userInfo.suffix_company_email;
                            // reset $pristine
                            $scope.companyInfoForm.$setPristine();
                        }
                    });

                });
            });
        };

        _this.companyInfoCancel = function () {

            _this.userInfoUpdate.company_join_date = _this.userInfo.company_join_date;
            _this.userInfoUpdate.company_email = _this.userInfo.company_email;
            _this.userInfoUpdate.suffix_company_email = _this.userInfo.suffix_company_email;
            _this.userInfoUpdate.skype_id = _this.userInfo.skype_id;
            _this.userInfoUpdate.level = _this.userInfo.level;
            _this.userInfoUpdate.department_id = _this.userInfo.department_id;
            _this.userInfoUpdate.competence_id = _this.userInfo.competence_id;
            _this.userInfoUpdate.job_title_id = _this.userInfo.job_title_id;
            _this.userInfoUpdate.line_manager_id = _this.userInfo.line_manager_id;


            employeeService.getCompetences(_this.userInfoUpdate.department_id).then(function (response) {
                _this.competences = response.data.data;
            });

            employeeService.getJobTitles(_this.userInfoUpdate.competence_id).then(function (response) {
                _this.job_titles = response.data.data;
            });
            // update arrow icon
            $scope.editEmpCtrl.isCompanyCollapseEdit = !$scope.editEmpCtrl.isCompanyCollapseEdit;
            // reset $pristine
            $scope.companyInfoForm.$setPristine();
        };

        employeeService.getDepartment().then(function (response) {
            _this.departments = response.data.data;
        });

        _this.departmentChange = function () {

            if (_this.userInfoUpdate.department_id != null || _this.userInfoUpdate.department_id != undefined) {

                employeeService.getCompetences(_this.userInfoUpdate.department_id).then(function (response) {
                    _this.competences = response.data.data;
                });

                // assign to new competence
                _this.userInfoUpdate.competence_id = "";
                // assign to new job_title
                _this.userInfoUpdate.job_title_id = "";
            }
        };

        _this.competenceChange = function () {
            if (_this.userInfoUpdate.competence_id != null && _this.userInfoUpdate.competence_id != undefined) {

                employeeService.getJobTitles(_this.userInfoUpdate.competence_id).then(function (response) {
                    _this.job_titles = response.data.data;
                });
            }
            // assign to new job_title
            _this.userInfoUpdate.job_title_id = "";
        };

        employeeService.getLineManagers().then(function (response) {
            _this.lineManagers = response.data.data;
        });

        _this.userInfo = {};
        _this.userInfoUpdate = {};

        employeeService.getUserInfo(_this.user_id).then(function (response) {
            _this.userInfo = response.data.data;
            $log.debug(_this.userInfo);
            _this.userInfo.company_join_date = parseDate(_this.userInfo.company_join_date);
            _this.userInfo.level = (_this.userInfo.level).toString();
            if (_this.userInfo.level == null || _this.userInfo.level == undefined) {
                _this.userInfo.level = "";
            }
            _this.userInfo.suffix_company_email = _this.userInfo.company_email.substring(_this.userInfo.company_email.indexOf('@'));

            _this.userInfo.company_email = _this.userInfo.company_email.substring(0, _this.userInfo.company_email.indexOf('@'));

            // check level
            $log.debug(_this.userInfo.level);

            // assign userInfo to userInfoUpdate
            _this.userInfoUpdate.company_join_date = _this.userInfo.company_join_date;
            _this.userInfoUpdate.company_email = _this.userInfo.company_email;
            _this.userInfoUpdate.suffix_company_email = _this.userInfo.suffix_company_email;
            _this.userInfoUpdate.skype_id = _this.userInfo.skype_id;
            _this.userInfoUpdate.level = _this.userInfo.level;


            employeeService.getUserInfo(_this.userInfo.line_manager_id).then(function (response) {
                _this.line_manager_name = response.data.data.first_name + ' ' + response.data.data.last_name;
            });

            // get job_title from competence_job_title_id
            employeeService.getInfo(_this.userInfo.competence_job_title_id).then(function (response) {
                _this.userInfo.job_title_id = response.data.data.job_title_id;
                _this.userInfo.competence_id = response.data.data.competence_id;

                employeeService.getCompetence(_this.userInfo.competence_id).then(function (response) {
                    _this.userInfo.department_id = response.data.data.department_id;
                    _this.competence_name = response.data.data.name;

                    employeeService.getDepartmentByID(_this.userInfo.department_id).then(function (response) {
                        _this.department_name = response.data.data.name;
                    });

                    employeeService.getCompetences(_this.userInfo.department_id).then(function (response) {
                        _this.competences = response.data.data;
                    });

                    employeeService.getJobTitles(_this.userInfo.competence_id).then(function (response) {
                        _this.job_titles = response.data.data;
                    });

                    _this.userInfo.department_id = (_this.userInfo.department_id).toString();
                    _this.userInfo.job_title_id = (_this.userInfo.job_title_id).toString();
                    _this.userInfo.competence_id = (_this.userInfo.competence_id).toString();
                    _this.userInfo.line_manager_id = (_this.userInfo.line_manager_id).toString();
                    // assign userInfo to userInfoUpdate
                    _this.userInfoUpdate.department_id = _this.userInfo.department_id;
                    _this.userInfoUpdate.competence_id = _this.userInfo.competence_id;
                    _this.userInfoUpdate.job_title_id = _this.userInfo.job_title_id;
                    _this.userInfoUpdate.line_manager_id = _this.userInfo.line_manager_id;
                });

                employeeService.getInfo(_this.userInfo.competence_job_title_id).then(function (response) {
                    var _jobTitleID = response.data.data.job_title_id;

                    employeeService.getJobtitle(_jobTitleID).then(function (response) {
                        _this.job_title_name = response.data.data.name;
                    });
                });
            });
        });
    }
    ]);
});