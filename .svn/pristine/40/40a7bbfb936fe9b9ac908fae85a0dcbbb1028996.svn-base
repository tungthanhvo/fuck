define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('personalInformationController', ['toastr', '$scope', '$http', '$log', '$routeParams', 'employeeService', '$uibModal', '$rootScope', function (toastr, $scope, $http, $log, $routeParams, employeeService, $uibModal, $rootScope) {

        var _this = this;

        _this.user_id = $scope.editEmpCtrl.user_id;

        _this.mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        _this.nameRegex = /^([^0-9 ;!@#$%^&*():'"{}/*~`|\/\\?\-_+,.\[\]]*)$/;
        _this.nameRegex1 = /^([^0-9;!@#$%^&*():'"{}/*~`|\/\\?\-_+,.\[\]]*)$/;

        // trigger click
        angular.element('#auto').trigger('click');
        $scope.editEmpCtrl.changePersonalCollapse();

        /// bootstrap-ui-datepicker

        _this.today = function () {
            _this.dt = new Date();
        };
        _this.today();

        _this.clear = function () {
            _this.dt = null;
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
            _this.dt = new Date(year, month, day);
        };

        _this.formats = ['dd-MM-yyyy'];
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
        _this.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];

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
                msg: 'PersonalInformation has been updated!!'
            },
            "error": {
                type: 'danger',
                msg: 'PersonalInformation udapted failed!!'
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
            var res;
            var currentdate = new Date(date);
            var digitalmonth = ((currentdate.getMonth() + 1) >= 10) ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1);
            var digitaldate = ((currentdate.getDate()) >= 10) ? (currentdate.getDate()) : '0' + (currentdate.getDate());
            res = currentdate.getFullYear() + "/" + digitalmonth + "/" + digitaldate;
            return new Date(res);
        }

        _this.showToastSuccessMessage = function () {
            toastr.success('Hello world!', 'Toastr fun!');
        };

        /**
         * get employee information
         */

        _this.userInfo = {};
        _this.line_manager_name = "";
        _this.competence_name = "";
        _this.department_name = "";
        _this.job_title_name = "";

        _this.userInfoUpdate = {};

        employeeService.getUserInfo(_this.user_id).then(function (response) {
            _this.userInfo = response.data.data;
            _this.userInfo.married_status = (_this.userInfo.married_status).toString();
            // _this.userInfo.dob = _this.userInfo.dob;

            //assign userInfo to userInfoUpdate
            _this.userInfoUpdate.last_name = _this.userInfo.last_name;
            _this.userInfoUpdate.first_name = _this.userInfo.first_name;
            _this.userInfoUpdate.nickname = _this.userInfo.nickname;
            _this.userInfoUpdate.married_status = _this.userInfo.married_status;
            _this.userInfoUpdate.gender = _this.userInfo.gender;
            _this.userInfoUpdate.dob = parseDate(_this.userInfo.dob);
            _this.userInfoUpdate.country_code = _this.userInfo.country_code;
            _this.userInfoUpdate.nationality_code = _this.userInfo.nationality_code;
            _this.userInfoUpdate.address = _this.userInfo.address;
            _this.userInfoUpdate.mobile = _this.userInfo.mobile;
            _this.userInfoUpdate.personal_email = _this.userInfo.personal_email;

            employeeService.getUserInfo(_this.userInfo.line_manager_id).then(function (response) {
                _this.line_manager_name = response.data.data.first_name + ' ' + response.data.data.last_name;
            });

            employeeService.getInfo(_this.userInfo.competence_job_title_id).then(function (response) {
                var _competenceID = response.data.data.competence_id;
                var _jobTitleID = response.data.data.job_title_id;

                employeeService.getCompetence(_competenceID).then(function (response) {
                    _this.competence_name = response.data.data.name;

                    var _departmentID = response.data.data.department_id;

                    employeeService.getDepartmentByID(_departmentID).then(function (response) {
                        _this.department_name = response.data.data.name;
                    });
                });

                employeeService.getJobtitle(_jobTitleID).then(function (response) {
                    _this.job_title_name = response.data.data.name;
                });

            });

            employeeService.getCountries().then(function (response) {
                _this.countries = response.data;
            });

            employeeService.getNationalities().then(function (response) {
                _this.nationality = response.data;
            });

        });

        _this.isDOBInvalidWithCurrent = false;
        _this.isDOBInvalidWith18Age = false;

        _this.dob_change = function () {
            // check valid date
            employeeService.getUserInfo(_this.user_id).then(function (response) {
                var data = response.data.data;
                var dob = new Date(_this.userInfoUpdate.dob).getTime();
                var now = new Date().getTime();

                if (dob > now) {
                    _this.isDOBInvalidWithCurrent = true;
                    return;
                } else {
                    _this.isDOBInvalidWithCurrent = false;
                }

                var validAge = 18 * 365 * 24 * 60 * 60 * 1000;
                var company = new Date(data.company_join_date).getTime();

                if ((company - dob) >= validAge) {
                    _this.isDOBInvalidWith18Age = false;
                } else {
                    // not enough 18 age
                    _this.isDOBInvalidWith18Age = true;
                    return;
                }
            });
        };

        // cancel button on personal information update
        _this.personalInfoCancel = function () {

            _this.userInfoUpdate.last_name = _this.userInfo.last_name;
            _this.userInfoUpdate.first_name = _this.userInfo.first_name;
            _this.userInfoUpdate.nickname = _this.userInfo.nickname;
            _this.userInfoUpdate.married_status = _this.userInfo.married_status;
            _this.userInfoUpdate.gender = _this.userInfo.gender;
            _this.userInfoUpdate.dob = parseDate(_this.userInfo.dob);
            _this.userInfoUpdate.country_code = _this.userInfo.country_code;
            _this.userInfoUpdate.nationality_code = _this.userInfo.nationality_code;
            _this.userInfoUpdate.address = _this.userInfo.address;
            _this.userInfoUpdate.mobile = _this.userInfo.mobile;
            _this.userInfoUpdate.personal_email = _this.userInfo.personal_email;
            // update arrow icon
            $scope.editEmpCtrl.isPersonalCollapseEdit = !$scope.editEmpCtrl.isPersonalCollapseEdit;
            // reset $pristine
            $scope.personalInfoForm.$setPristine();

            // reset flag validate
            _this.isDOBInvalidWithCurrent = false;
            _this.isDOBInvalidWith18Age = false;
        };

        ////////////

        _this.mobile_change = function () {

            if (_this.userInfoUpdate.mobile !== '' && _this.userInfoUpdate.mobile !== null && _this.userInfoUpdate.mobile !== undefined) {
                var regex = new RegExp("/^[0-9+() -]+$/");
                if (regex.test(_this.userInfoUpdate.mobile)) {
                    $log.debug("Valid");
                    _this.isValidMobileNumber = true;
                } else {
                    $log.debug("Invalid");
                    _this.isValidMobileNumber = false;
                    return;
                }
            } else {
                _this.isValidMobileNumber = true;
            }
        };

        function isMobileFormatValid(mobileNumber) {
            var regex = "/^[0-9+() -]+$/";
            return mobileNumber.match(regex);
        }


        _this.isValidMobileNumber = true;

        _this.personalInfoSubmit = function () {

            // check if data values not changes
            // if (!isValueChange()) {
            //     toastr.warning('Nothing changes to update.', 'TMS');
            //     $scope.personalInfoForm.$setPristine();
            //     return;
            // }

            // if (_this.userInfoUpdate.dob === null || _this.userInfoUpdate.dob === undefined) {
            //     _this.isDOBValid = true;
            //     return;
            // } else {
            //     _this.isDOBValid = false;
            // }
            //
            // // TODO : check phone number format
            // var mobile = _this.userInfoUpdate.mobile;
            //
            // $log.debug(mobile);
            //
            // var regex = new RegExp("/^[0-9+() -]+$/");
            // if (mobile !== '' && mobile !== null && mobile !== undefined) {
            //     if (regex.test(mobile)) {
            //         $log.debug("Valid");
            //         _this.isValidMobileNumber = true;
            //     } else {
            //         $log.debug("Invalid");
            //         _this.isValidMobileNumber = false;
            //         return;
            //     }
            // }

            // update the latest company_join_date
            employeeService.getUserInfo(_this.user_id).then(function (response) {
                var data = response.data.data;
                var validAge = 18 * 365 * 24 * 60 * 60 * 1000;
                var dob = new Date(_this.userInfoUpdate.dob).getTime();
                var now = new Date().getTime();
                var company = new Date(data.company_join_date).getTime();

                // $log.debug("validAge: " + validAge);
                // $log.debug("dob: " + dob);
                // $log.debug("now: " + now);
                //
                // $log.debug("checkAge: " + (now - dob));

                if (dob > now) {
                    // dob grater than now
                    _this.isDOBInvalidWithCurrent = true;
                    return;
                } else {
                    _this.isDOBInvalidWithCurrent = false;
                }

                if ((company - dob) >= validAge) {
                    _this.isDOBInvalidWith18Age = false;
                } else {
                    // not enough 18 age
                    _this.isDOBInvalidWith18Age = true;
                    return;
                }

                _this.userInfoUpdate.personal_email = (_this.userInfoUpdate.personal_email).toLowerCase();

                employeeService.updatePersonalInformationForUser(_this.user_id, _this.userInfoUpdate).then(function (response) {

                    if (response.data.code !== parseInt(200)) {
                        toastr.error('Update personal information encountered error.', 'TMS');
                    } else if (response.data.code === parseInt(200)) {
                        toastr.success('Update Personal Information successfully.', 'TMS');
                        //update userInfoUpdate to userInfo for biding to personalinformation_VIEW
                        _this.userInfo.last_name = _this.userInfoUpdate.last_name;
                        _this.userInfo.first_name = _this.userInfoUpdate.first_name;
                        /**emit to setTitle for page */
                        $scope.$emit('setTitle', {
                            text: "Employee: " + _this.userInfo.first_name + ' ' + _this.userInfo.last_name
                        });
                        _this.userInfo.nickname = _this.userInfoUpdate.nickname;
                        _this.userInfo.married_status = _this.userInfoUpdate.married_status;
                        _this.userInfo.gender = _this.userInfoUpdate.gender;
                        _this.userInfo.dob = parseDate(_this.userInfoUpdate.dob);
                        /**
                         * need to get dayofbirth for skill metric
                         */
                        $rootScope.$broadcast('changelistyears', {
                            year: (new Date(_this.userInfo.dob)).getFullYear()
                        });

                        _this.userInfo.country_code = _this.userInfoUpdate.country_code;
                        _this.userInfo.nationality_code = _this.userInfoUpdate.nationality_code;
                        _this.userInfo.address = _this.userInfoUpdate.address;
                        _this.userInfo.mobile = _this.userInfoUpdate.mobile;
                        _this.userInfo.personal_email = (_this.userInfoUpdate.personal_email).toLowerCase();;
                        //auto-update empProfile
                        $scope.editEmpCtrl.full_name = _this.userInfo.first_name + ' ' + _this.userInfo.last_name;
                        $scope.editEmpCtrl.married_status = _this.userInfo.married_status;
                        $scope.editEmpCtrl.company_join_date_validate = _this.userInfoUpdate.dob;
                        // reset $pristine
                        $scope.personalInfoForm.$setPristine();
                    }
                });
            });
        };
    }]);
});