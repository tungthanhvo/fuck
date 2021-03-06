define(['./module', 'config'], function (controllers, config) {
    'use strict';
    controllers.controller('projectInformationController', ['toastr', 'metadataService', 'projectService', '$rootScope', '$scope', '$location', '$http', '$log', '$routeParams', 'employeeService', 'smoothScroll', 'exportCVService', function (toastr, metadataService, projectService, $rootScope, $scope, $location, $http, $log, $routeParams, employeeService, smoothScroll, exportCVService) {
        // skeleton
        var _this = this;

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

        function parseDate(date) {
            var res = "";
            var currentdate = new Date(date);
            var digitalmonth = ((currentdate.getMonth() + 1) >= 10) ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1);
            var digitaldate = ((currentdate.getDate()) >= 10) ? (currentdate.getDate()) : '0' + (currentdate.getDate());
            res = currentdate.getFullYear() + "/" + digitalmonth + "/" + digitaldate;
            return new Date(res);
        }

        _this.isSizeDayInvalid = false;
        _this.size_day_change = function () {
            if (_this.projectInfoUpdate.project_size_days > 1000000) {
                _this.isSizeDayInvalid = true;
            } else {
                _this.isSizeDayInvalid = false;
            }
        };

        _this.isStartDateInvalid = false;
        _this.isEndDateInvalid = false;

        _this.isInvalidWithMin = false;
        _this.isInvalidWithMax = false;

        _this.start_date_change = function () {

            if (_this.projectInfoUpdate.project_end_date === null || _this.projectInfoUpdate.project_end_date === undefined) {
                return;
            }

            var start_date = new Date(_this.projectInfoUpdate.project_start_date).getTime();
            var end_date = new Date(_this.projectInfoUpdate.project_end_date).getTime();

            if (start_date >= end_date) {
                _this.isStartDateInvalid = true;
                _this.isEndDateInvalid = false;
            } else {
                _this.isStartDateInvalid = false;
                _this.isEndDateInvalid = false;
            }

            //projectService.getMinMaxDateOfMembers(24).then(function (response) {
            //    var data = response.data.data[1];
            //    var min = data.min;
            //    var max = data.max;
            //
            //    if (min == null && max == null) {
            //        return;
            //    }
            //
            //    var minDate = new Date(min).getTime();
            //    var maxDate = new Date(max).getTime();
            //
            //    var start_date = new Date(_this.projectInfoUpdate.project_start_date).getTime();
            //    var end_date = new Date(_this.projectInfoUpdate.project_end_date).getTime();
            //
            //    if (start_date > minDate) {
            //        _this.isInvalidWithMin = true;
            //        _this.isInvalidWithMax = false;
            //    } else {
            //        _this.isInvalidWithMin = false;
            //        _this.isInvalidWithMax = false;
            //    }
            //
            //    if (_this.projectInfoUpdate.project_end_date) {
            //        if (end_date < maxDate) {
            //            _this.isInvalidWithMax = true;
            //            _this.isInvalidWithMin = false;
            //        } else {
            //            _this.isInvalidWithMax = false;
            //            _this.isInvalidWithMin = false;
            //        }
            //    }
            //});

            // if (end_date < start_date) {
            //     _this.isEndDateInvalid = true;
            //     _this.isStartDateInvalid = false;
            // } else {
            //     _this.isEndDateInvalid = false;
            //     _this.isStartDateInvalid = false;
            // }
        };

        _this.end_date_change = function () {
            // if end_date is null, not to validate start_date
            if (_this.projectInfoUpdate.project_end_date === null || _this.projectInfoUpdate.project_end_date === undefined) {
                _this.isStartDateInvalid = false;
                _this.isEndDateInvalid = false;
                return;
            }

            var start_date = new Date(_this.projectInfoUpdate.project_start_date).getTime();
            var end_date = new Date(_this.projectInfoUpdate.project_end_date).getTime();

            if (end_date <= start_date) {
                _this.isEndDateInvalid = true;
                _this.isStartDateInvalid = false;
            } else {
                _this.isEndDateInvalid = false;
                _this.isStartDateInvalid = false;
            }

            //projectService.getMinMaxDateOfMembers(24).then(function (response) {
            //    var data = response.data.data[1];
            //    var min = data.min;
            //    var max = data.max;
            //
            //    if (min == null && max == null) {
            //        return;
            //    }
            //
            //    var minDate = new Date(min).getTime();
            //    var maxDate = new Date(max).getTime();
            //
            //    var start_date = new Date(_this.projectInfoUpdate.project_start_date).getTime();
            //    var end_date = new Date(_this.projectInfoUpdate.project_end_date).getTime();
            //
            //    if (start_date > minDate) {
            //        _this.isInvalidWithMin = true;
            //        _this.isInvalidWithMax = false;
            //    } else {
            //        _this.isInvalidWithMin = false;
            //        _this.isInvalidWithMax = false;
            //    }
            //
            //    if (_this.projectInfoUpdate.project_end_date) {
            //        if (end_date < maxDate) {
            //            _this.isInvalidWithMax = true;
            //            _this.isInvalidWithMin = false;
            //        } else {
            //            _this.isInvalidWithMax = false;
            //            _this.isInvalidWithMin = false;
            //        }
            //    }
            //});

            // if (start_date > end_date) {
            //     _this.isStartDateInvalid = true;
            //     _this.isEndDateInvalid = false;
            // } else {
            //     _this.isStartDateInvalid = false;
            //     _this.isEndDateInvalid = false;
            // }
        };

        _this.project_id = $scope.editProCtrl.project_id;

        _this.metaData = metadataService.editProject;

        _this.locations = _this.metaData.locations;

        _this.isViewMode = true;
        _this.saveOrEditButton = "Edit";

        var MSG = 'This project has members. If you want to delete this project, these members must be rejected first. ';

        _this.delete = function () {
            projectService.deleteProjectInfo(_this._projectInfoUpdateTemp).then(function (response) {
                if (response.data.code !== 200) {
                    toastr.warning(MSG, 'TMS');
                } else {
                    toastr.success('The project was deleted', 'TMS');
                    $rootScope.searchType = "Project";
                    $location.path("/search");
                }
            });
        };

        _this.project_status_change = function () {

            if (_this.projectInfoUpdate.project_status === '2') {
                _this.projectInfoUpdate.project_end_date = new Date();
            } else {
                if (_this.projectInfo.project_end_date == '' || _this.projectInfo.project_end_date == null || _this.projectInfo.project_end_date == undefined) {
                    _this.projectInfoUpdate.project_end_date = "";
                } else {
                    _this.projectInfoUpdate.project_end_date = new Date(_this.projectInfo.project_end_date);
                }
            }
        };

        _this.edit = function () {
            _this.isViewMode = !_this.isViewMode;

            //change label for button
            if (_this.isViewMode) {
                _this.saveOrEditButton = "Edit";
            } else {
                _this.saveOrEditButton = "Save";
            }

            // check if disable another tab when in edit mode
            if (_this.isViewMode) {
                $scope.editProCtrl.disableAnotherTab = false;
            } else {
                $scope.editProCtrl.disableAnotherTab = true;
            }

            //

            projectService.getProjectManager(_this.project_id).success(function (data) {
                _this.pm = data.data;
            });

            projectService.getSeniorManager(_this.project_id).success(function (data) {
                _this.sm = data.data;
            });
        };

        _this.cancel = function () {
            _this.isViewMode = !_this.isViewMode;

            //change label for button
            if (_this.isViewMode) {
                _this.saveOrEditButton = "Edit";
            } else {
                _this.saveOrEditButton = "Save";
            }

            // check if disable another tab when in edit mode
            if (_this.isViewMode) {
                $scope.editProCtrl.disableAnotherTab = false;
            } else {
                $scope.editProCtrl.disableAnotherTab = true;
            }
            //reset data
            _this.projectInfoUpdate.project_name = _this.projectInfo.project_name;
            _this.projectInfoUpdate.project_type = (_this.projectInfo.project_type).toString();
            _this.projectInfoUpdate.project_status = (_this.projectInfo.project_status).toString();
            _this.projectInfoUpdate.project_start_date = parseDate(_this.projectInfo.project_start_date);
            // check if date is null
            if (_this.projectInfo.project_end_date === null || _this.projectInfo.project_end_date === undefined) {
                _this.projectInfoUpdate.project_end_date = "";
            } else {
                _this.projectInfoUpdate.project_end_date = parseDate(_this.projectInfo.project_end_date);
            }
            _this.projectInfoUpdate.project_size_days = _this.projectInfo.project_size_days;
            _this.projectInfoUpdate.project_location = (_this.projectInfo.project_location).toString();
            _this.projectInfoUpdate.project_pm_manager = (_this.projectInfo.project_pm_manager).toString();
            _this.projectInfoUpdate.project_program_manager = (_this.projectInfo.project_program_manager).toString();
            _this.projectInfoUpdate.project_engagement_manager = (_this.projectInfo.project_engagement_manager).toString();
            _this.projectInfoUpdate.project_short_description = _this.projectInfo.project_short_description;
            _this.projectInfoUpdate.project_long_description = _this.projectInfo.project_long_description;
            _this.projectInfoUpdate.project_technologies = _this.projectInfo.project_technologies;
            _this.projectInfoUpdate.project_client_name = _this.projectInfo.project_client_name;
            _this.projectInfoUpdate.project_industry = (_this.projectInfo.project_industry).toString();
            _this.projectInfoUpdate.project_client_description = _this.projectInfo.project_client_description;
            // reset flag for validate
            _this.isStartDateInvalid = false;
            _this.isEndDateInvalid = false;
            _this.isSizeDayInvalid = false;
            _this.isInvalidWithMin = false;
            _this.isInvalidWithMax = false;
        };

        function isEmpty(obj) {
            return Object.keys(obj).length === 0;
        }

        _this.isProjectNameExist = false;

        _this.projectInfo = {};
        _this.project_program_manager = "";
        _this.project_engagement_manager = "";
        _this.project_pm_manager = "";

        _this.projectInfoUpdate = {};

        projectService.getProjectInfo(_this.project_id).then(function (response) {
            var _projectInfo = response.data.data;

            var _isEmpty = isEmpty(_projectInfo);
            if (_isEmpty) {
                $location.path("/search");
                return;
            }
            _this._projectInfoUpdateTemp = _projectInfo;

            $rootScope.$broadcast('getStarDate_Project', {
                start_date: _projectInfo.start_date,
                end_date: _projectInfo.end_date
            });

            _this.projectInfo.project_name = _projectInfo.name;

            // update for title project
            $scope.$emit('setTitle', {
                text: "Project: " + _projectInfo.name
            });

            _this.projectInfo.project_type = _projectInfo.type_id;
            _this.projectInfo.project_status = _projectInfo.status_id;
            _this.projectInfo.project_start_date = _projectInfo.start_date;
            _this.projectInfo.project_end_date = _projectInfo.end_date;
            _this.projectInfo.project_size_days = _projectInfo.size;
            _this.projectInfo.project_location = _projectInfo.location_id || "";
            _this.projectInfo.project_pm_manager = _projectInfo.project_manager.user_id;
            _this.projectInfo.project_program_manager = _projectInfo.program_manager.user_id;
            _this.projectInfo.project_engagement_manager = _projectInfo.engagement_manager.user_id;
            _this.projectInfo.project_short_description = _projectInfo.short_description;
            _this.projectInfo.project_long_description = _projectInfo.long_description;
            _this.projectInfo.project_technologies = _projectInfo.technology;
            _this.projectInfo.project_client_name = _projectInfo.client_name;
            _this.projectInfo.project_industry = _projectInfo.client_industry_id || "";
            _this.projectInfo.project_client_description = _projectInfo.client_description;

            //update name
            _this.project_program_manager = _projectInfo.program_manager.user.first_name + " " + _projectInfo.program_manager.user.last_name;
            _this.project_engagement_manager = _projectInfo.engagement_manager.user.first_name + " " + _projectInfo.engagement_manager.user.last_name
            _this.project_pm_manager = _projectInfo.project_manager.user.first_name + " " + _projectInfo.project_manager.user.last_name

            _this.project_type_name = _projectInfo.type.name;
            _this.project_status_name = _projectInfo.status.name;
            if (_projectInfo.location !== null && _projectInfo.location !== undefined) {
                _this.project_location_name = _projectInfo.location.name;
            } else {
                _this.project_location_name = "";
            }
            if (_projectInfo.client_industry !== null && _projectInfo.client_industry !== undefined) {
                _this.client_industry_name = _projectInfo.client_industry.name;
            } else {
                _this.client_industry_name = "";
            }

            // assign for update
            _this.projectInfoUpdate.project_name = _this.projectInfo.project_name;
            _this.projectInfoUpdate.project_type = (_this.projectInfo.project_type).toString();
            _this.projectInfoUpdate.project_status = (_this.projectInfo.project_status).toString();
            _this.projectInfoUpdate.project_start_date = parseDate(_this.projectInfo.project_start_date);
            // check if end-date is null
            if (_this.projectInfo.project_end_date === null || _this.projectInfo.project_end_date === undefined) {
                _this.projectInfoUpdate.project_end_date = "";
            } else {
                _this.projectInfoUpdate.project_end_date = parseDate(_this.projectInfo.project_end_date);
            }
            //
            _this.projectInfoUpdate.project_size_days = _this.projectInfo.project_size_days;
            _this.projectInfoUpdate.project_location = (_this.projectInfo.project_location).toString();
            _this.projectInfoUpdate.project_pm_manager = (_this.projectInfo.project_pm_manager).toString();
            _this.projectInfoUpdate.project_program_manager = (_this.projectInfo.project_program_manager).toString();
            _this.projectInfoUpdate.project_engagement_manager = (_this.projectInfo.project_engagement_manager).toString();
            _this.projectInfoUpdate.project_short_description = _this.projectInfo.project_short_description;
            _this.projectInfoUpdate.project_long_description = _this.projectInfo.project_long_description;
            _this.projectInfoUpdate.project_technologies = _this.projectInfo.project_technologies;
            _this.projectInfoUpdate.project_client_name = _this.projectInfo.project_client_name;
            _this.projectInfoUpdate.project_industry = (_this.projectInfo.project_industry).toString();
            _this.projectInfoUpdate.project_client_description = _this.projectInfo.project_client_description;
        });

        _this.updateProjectInfoSubmit = function () {
            $log.debug('data changes after modify on view');
            $log.debug(_this.projectInfoUpdate);

            if (_this.isStartDateInvalid || _this.isEndDateInvalid) {
                return;
            }

            if (_this.isSizeDayInvalid) {
                return;
            }

            // check if the project's name already exist.
            projectService.checkProjectName(_this.projectInfoUpdate.project_name).success(function (data) {

                if (_this.projectInfoUpdate.project_name === _this.projectInfo.project_name) {
                    $log.debug('project_name not changes');
                } else {
                    // project_name has changed
                    if (data.existed) {
                        _this.isProjectNameExist = true;
                        $log.debug('new project_name already exist');
                        return;
                    } else {
                        _this.isProjectNameExist = false;
                        $log.debug('new project_name valid');
                    }
                }

                _this._projectInfoUpdateTemp.id = _this.project_id;
                _this._projectInfoUpdateTemp.name = _this.projectInfoUpdate.project_name;
                _this._projectInfoUpdateTemp.start_date = _this.projectInfoUpdate.project_start_date;

                if (_this.projectInfoUpdate.project_end_date == '' || _this.projectInfoUpdate.project_end_date == null || _this.projectInfoUpdate.project_end_date == undefined) {
                    _this._projectInfoUpdateTemp.end_date = null;
                } else {
                    _this._projectInfoUpdateTemp.end_date = _this.projectInfoUpdate.project_end_date;
                }
                _this._projectInfoUpdateTemp.size = _this.projectInfoUpdate.project_size_days;
                _this._projectInfoUpdateTemp.short_description = _this.projectInfoUpdate.project_short_description;
                _this._projectInfoUpdateTemp.long_description = _this.projectInfoUpdate.project_long_description;
                _this._projectInfoUpdateTemp.client_description = _this.projectInfoUpdate.project_client_description;
                _this._projectInfoUpdateTemp.technology = _this.projectInfoUpdate.project_technologies;
                _this._projectInfoUpdateTemp.client_name = _this.projectInfoUpdate.project_client_name;

                _this._projectInfoUpdateTemp.client_industry_id = _this.projectInfoUpdate.project_industry;
                if (_this._projectInfoUpdateTemp.client_industry_id === '') {
                    _this._projectInfoUpdateTemp.client_industry_id = null;
                }
                _this._projectInfoUpdateTemp.location_id = _this.projectInfoUpdate.project_location;
                if (_this._projectInfoUpdateTemp.location_id === '') {
                    _this._projectInfoUpdateTemp.location_id = null;
                }
                _this._projectInfoUpdateTemp.type_id = _this.projectInfoUpdate.project_type;
                _this._projectInfoUpdateTemp.status_id = _this.projectInfoUpdate.project_status;

                _this._projectInfoUpdateTemp.project_manager.user_id = _this.projectInfoUpdate.project_pm_manager;
                _this._projectInfoUpdateTemp.program_manager.user_id = _this.projectInfoUpdate.project_program_manager;
                _this._projectInfoUpdateTemp.engagement_manager.user_id = _this.projectInfoUpdate.project_engagement_manager;


                $log.debug('temp to send to server for update');
                $log.debug(_this._projectInfoUpdateTemp);


                projectService.updateProjectInfo(_this._projectInfoUpdateTemp).then(function (response) {
                    if (response.data.code === 200) {
                        $rootScope.$broadcast('getStarDate_Project', {
                            start_date: _this._projectInfoUpdateTemp.start_date,
                            end_date: _this._projectInfoUpdateTemp.end_date
                        });
                        //
                        toastr.success('Update project information successfully.', 'TMS');
                        // update for title project
                        $scope.$emit('setTitle', {
                            text: "Project: " + _this.projectInfoUpdate.project_name
                        });
                        //
                        _this.isProjectNameExist = false;
                        //switch to view mode
                        _this.isViewMode = true;
                        $scope.editProCtrl.disableAnotherTab = false;

                        $scope.projectInfo.$setPristine();
                        //
                        if (_this.projectInfoUpdate.project_industry !== '' && _this.projectInfoUpdate.project_industry !== null && _this.projectInfoUpdate.project_industry !== undefined) {
                            if (_this.projectInfoUpdate.project_industry !== _this.projectInfo.project_industry) {
                                projectService.getClientIndustry(_this.projectInfoUpdate.project_industry).then(function (response) {
                                    var data = response.data.data;
                                    _this.client_industry_name = data.name;
                                    $log.debug(_this.client_industry_name);
                                });
                            }
                        } else {
                            _this.client_industry_name = "";
                        }

                        if (_this.projectInfoUpdate.project_location !== '' && _this.projectInfoUpdate.project_location !== null && _this.projectInfoUpdate.project_location !== undefined) {
                            if (_this.projectInfoUpdate.project_location !== _this.projectInfo.project_location) {
                                projectService.getProjectLocation(_this.projectInfoUpdate.project_location).then(function (response) {
                                    var data = response.data.data;
                                    _this.project_location_name = data.name;
                                    $log.debug(_this.project_location_name);
                                });
                            }
                        } else {
                            _this.project_location_name = "";
                        }

                        if (_this.projectInfo.project_type !== _this.projectInfoUpdate.project_type) {
                            projectService.getProjectType(_this.projectInfoUpdate.project_type).then(function (response) {
                                var data = response.data.data;
                                _this.project_type_name = data.name;
                                $log.debug(_this.project_type_name);
                            });
                        }

                        if (_this.projectInfo.project_status !== _this.projectInfoUpdate.project_status) {
                            projectService.getProjectStatus(_this.projectInfoUpdate.project_status).then(function (response) {
                                var data = response.data.data;
                                _this.project_status_name = data.name;
                                $log.debug(_this.project_status_name);
                            });
                        }
                        // update data after update to view
                        _this.projectInfo.project_name = _this.projectInfoUpdate.project_name;
                        _this.projectInfo.project_type = _this.projectInfoUpdate.project_type;
                        _this.projectInfo.project_status = _this.projectInfoUpdate.project_status;
                        _this.projectInfo.project_start_date = parseDate(_this.projectInfoUpdate.project_start_date);
                        // check if edit project_end_date to null
                        if (_this.projectInfoUpdate.project_end_date === null || _this.projectInfoUpdate.project_end_date === undefined || _this.projectInfoUpdate.project_end_date === '') {
                            _this.projectInfo.project_end_date = "";
                        } else {
                            _this.projectInfo.project_end_date = parseDate(_this.projectInfoUpdate.project_end_date);
                        }
                        _this.projectInfo.project_size_days = _this.projectInfoUpdate.project_size_days;
                        _this.projectInfo.project_location = _this.projectInfoUpdate.project_location;
                        _this.projectInfo.project_pm_manager = _this.projectInfoUpdate.project_pm_manager;
                        _this.projectInfo.project_program_manager = _this.projectInfoUpdate.project_program_manager;
                        _this.projectInfo.project_engagement_manager = _this.projectInfoUpdate.project_engagement_manager;
                        _this.projectInfo.project_short_description = _this.projectInfoUpdate.project_short_description;
                        _this.projectInfo.project_long_description = _this.projectInfoUpdate.project_long_description;
                        _this.projectInfo.project_technologies = _this.projectInfoUpdate.project_technologies;
                        _this.projectInfo.project_client_name = _this.projectInfoUpdate.project_client_name;
                        _this.projectInfo.project_industry = _this.projectInfoUpdate.project_industry;
                        _this.projectInfo.project_client_description = _this.projectInfoUpdate.project_client_description;

                        // update all name for view mode
                        employeeService.getUserInfo(_this.projectInfoUpdate.project_pm_manager).then(function (response) {
                            var data = response.data.data;
                            _this.project_pm_manager = data.first_name + " " + data.last_name;
                            $log.debug(_this.project_pm_manager);
                        });

                        employeeService.getUserInfo(_this.projectInfoUpdate.project_program_manager).then(function (response) {
                            var data = response.data.data;
                            _this.project_program_manager = data.first_name + " " + data.last_name;
                            $log.debug(_this.project_program_manager);
                        });

                        employeeService.getUserInfo(_this.projectInfoUpdate.project_engagement_manager).then(function (response) {
                            var data = response.data.data;
                            _this.project_engagement_manager = data.first_name + " " + data.last_name;
                            $log.debug(_this.project_engagement_manager);
                        });
                    } else {
                        toastr.error('Update project information failed.', 'TMS');
                        $log.debug(response.data.data);
                    }
                });
            });
        };
    }]);
});