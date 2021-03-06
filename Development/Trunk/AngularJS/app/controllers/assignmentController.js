define(['./module', 'config'], function (controllers, config) {
    'use strict';
    controllers.controller('assignmentController', ['$uibModal', 'pagingService', 'assignmentService', 'toastr', 'Upload', '$scope', '$log', '$http', 'employeeService', function ($uibModal, pagingService, assignmentService, toastr, Upload, $scope, $log, $http, employeeService) {
        var _this = this;
        // TODO
        _this.user_id = $scope.editEmpCtrl.user_id;

        function compareFunction(a, b) {
            var minusdate = Date.parse(a.start_date) - Date.parse(b.start_date);
            return minusdate >= 0 ? false : true;
        }

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
            maxDate: new Date(),
            minDate: new Date(),
            startingDay: 1,
            datepickerMode: 'month',
            minMode: 'month'
        };

        _this.dtmax = new Date();


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

        // parse String to Date
        function parseDate(date) {
            var res = "";
            var currentdate = new Date(date);
            var digitalmonth = ((currentdate.getMonth() + 1) >= 10) ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1);
            var digitaldate = ((currentdate.getDate()) >= 10) ? (currentdate.getDate()) : '0' + (currentdate.getDate());
            res = currentdate.getFullYear() + "/" + digitalmonth + "/" + digitaldate;
            return new Date(res);
        }

        _this.isViewMode = true;

        _this.isSizeDayInvalid1 = false;
        _this.isSizeDayInvalid2 = false;

        _this.size_day_change1 = function () {
            if (_this.workingHistory.project_size > 1000000) {
                _this.isSizeDayInvalid1 = true;
            } else {
                _this.isSizeDayInvalid1 = false;
            }
        };

        _this.size_day_change2 = function () {
            if (_this.workingHistoryDetail.size > 1000000) {
                _this.isSizeDayInvalid2 = true;
            } else {
                _this.isSizeDayInvalid2 = false;
            }

            if (!_this.isDataChanged) {
                _this.isDataChanged = true;
            }
        };

        // model for add working history
        _this.workingHistory = {};
        _this.workingHistory.project_from = new Date();
        _this.workingHistory.project_to = new Date();

        // edit button to switch to edit mode
        _this.edit = function () {
            _this.isViewMode = !_this.isViewMode;
        };
        // cancel and reset to view mode
        _this.cancel = function () {
            _this.isViewMode = true;
            _this.isDataChanged = false;
            //
            _this.isStartDateInvalidWithEndate = false;
            _this.isStartDateInvalidWithCurrent = false;
            _this.isEndDateInvalidWithCurrent = false;
            _this.isEndDateInvalidWithStartDate = false;
            _this.isStartDateInvalidWithEndate2 = false;
            _this.isStartDateInvalidWithCurrent2 = false;
            _this.isEndDateInvalidWithCurrent2 = false;
            _this.isEndDateInvalidWithStartDate2 = false;
            _this.isSizeDayInvalid1 = false;
            _this.isSizeDayInvalid2 = false;
        };

        // reset before add another working history
        _this.add_more = function () {
            _this.workingHistory = {};
            _this.workingHistory.project_from = "";
            _this.workingHistory.project_to = "";
            $scope.workingHistoryForm.$setPristine();
        };

        _this.array_delete = [];

        _this.remove = function (history) {
            if (_this.array_delete.indexOf(history.id) == -1) {
                _this.array_delete.push(history.id);
            } else {
                _this.array_delete.splice(_this.array_delete.indexOf(history.id), 1);
                debugger;
            }
        };

        _this.isDataChanged = false;

        _this.project_name_change = function () {
            if (!_this.isDataChanged) {
                _this.isDataChanged = true;
            }
        };

        _this.isStartDateInvalidWithEndate = false;
        _this.isStartDateInvalidWithCurrent = false;

        _this.start_date_change = function () {
            var start_date = new Date(_this.workingHistory.project_from).getTime();
            var end_date = new Date(_this.workingHistory.project_to).getTime();
            var now = new Date().getTime();

            if (start_date > end_date) {
                _this.isStartDateInvalidWithEndate = true;
                _this.isEndDateInvalidWithStartDate = false;
            } else {
                _this.isStartDateInvalidWithEndate = false;
                _this.isEndDateInvalidWithStartDate = false;
            }
        };

        _this.isEndDateInvalidWithCurrent = false;
        _this.isEndDateInvalidWithStartDate = false;

        _this.end_date_change = function () {
            var now = new Date().getTime();
            var start_date = new Date(_this.workingHistory.project_from).getTime();
            var end_date = new Date(_this.workingHistory.project_to).getTime();

            if (end_date < start_date) {
                _this.isEndDateInvalidWithStartDate = true;
                _this.isStartDateInvalidWithEndate = false;
            } else {
                _this.isEndDateInvalidWithStartDate = false;
                _this.isStartDateInvalidWithEndate = false;
            }
        };

        _this.isStartDateInvalidWithEndate2 = false;
        _this.isStartDateInvalidWithCurrent2 = false;

        _this.project_from_change = function () {

            if (!_this.isDataChanged) {
                _this.isDataChanged = true;
            }

            if (_this.workingHistoryDetail.start_date == '' || _this.workingHistoryDetail.start_date == null || _this.workingHistoryDetail.start_date == undefined) {
                _this.isStartDateInvalidWithEndate2 = false;
                _this.isStartDateInvalidWithCurrent2 = false;
            }

            if (_this.workingHistoryDetail.end_date == '' || _this.workingHistoryDetail.end_date == null || _this.workingHistoryDetail.end_date == undefined) {
                _this.isEndDateInvalidWithCurrent2 = false;
                _this.isEndDateInvalidWithStartDate2 = false;
                return;
            }

            var start_date = new Date(_this.workingHistoryDetail.start_date).getTime();
            var end_date = new Date(_this.workingHistoryDetail.end_date).getTime();
            var now = new Date().getTime();

            if (start_date > end_date) {
                _this.isStartDateInvalidWithEndate2 = true;
                _this.isEndDateInvalidWithStartDate2 = false;
            } else {
                _this.isStartDateInvalidWithEndate2 = false;
                _this.isEndDateInvalidWithStartDate2 = false
            }
        };

        _this.isEndDateInvalidWithCurrent2 = false;
        _this.isEndDateInvalidWithStartDate2 = false;

        _this.project_to_change = function () {

            if (!_this.isDataChanged) {
                _this.isDataChanged = true;
            }

            if (_this.workingHistoryDetail.start_date == '' || _this.workingHistoryDetail.start_date == null || _this.workingHistoryDetail.start_date == undefined) {
                _this.isStartDateInvalidWithEndate2 = false;
                _this.isStartDateInvalidWithCurrent2 = false;
            }

            if (_this.workingHistoryDetail.end_date == '' || _this.workingHistoryDetail.end_date == null || _this.workingHistoryDetail.end_date == undefined) {
                _this.isEndDateInvalidWithCurrent2 = false;
                _this.isEndDateInvalidWithStartDate2 = false;
                return;
            }

            var now = new Date().getTime();
            var start_date = new Date(_this.workingHistoryDetail.start_date).getTime();
            var end_date = new Date(_this.workingHistoryDetail.end_date).getTime();

            if (end_date < start_date) {
                _this.isEndDateInvalidWithStartDate2 = true;
                _this.isStartDateInvalidWithEndate2 = false;
            } else {
                _this.isEndDateInvalidWithStartDate2 = false;
                _this.isStartDateInvalidWithEndate2 = false;
            }
        };
        _this.workingHistories_Shown = [];
        _this.pager;
        assignmentService.getAllWorkingHistories(_this.user_id).then(function (response) {
            _this.workingHistories = [];
            angular.forEach(response.data.data, function (value, index) {
                value.is_delete = false;
                _this.workingHistories.push(value);
            });
            //
            _this.workingHistories = _this.workingHistories.sort(compareFunction);
            //
            if (_this.workingHistories.length) {
                setPage(_this.workingHistories.length, 1, 5);
                for (var i = 0; i < _this.workingHistories.length && i < _this.pager.pageSize; i++) {
                    _this.workingHistories_Shown.push(_this.workingHistories[i]);
                }
                //_this.workingHistories_Shown = _this.workingHistories.slice(0, _this.pager.pageSize);
            }

        });

        var setPage = function (totalItems, currPage, pageSize) {
            if (currPage < 1 || currPage > totalItems) {
                return;
            }
            // get pager object from service
            _this.pager = pagingService.GetPager(totalItems, currPage, pageSize);
        };
        _this.seach = function (page) {
            if (page < 1 || page > _this.pager.endPage) {
                return;
            }
            _this.pager.currentPage = page;
            _this.workingHistories_Shown = [];
            if (_this.pager) {
                for (var i = _this.pager.pageSize * (page - 1); i < _this.workingHistories.length && i < _this.pager.pageSize * (page - 1) + _this.pager.pageSize; i++) {
                    _this.workingHistories_Shown.push(_this.workingHistories[i]);
                }
                //_this.workingHistories_Shown = _this.workingHistories.slice(_this.pager.pageSize * (page - 1), _this.pager.pageSize * (page - 1) + _this.pager.pageSize);
            }

        }

        // model for details
        _this.workingHistoryDetail = {};
        // model for update
        _this.workingHistoryDetail = {};


        _this.history_temp = {};
        _this.working_history_detail = function (history) {
            var history_id = history.id;
            _this.history_temp = history;
            // get working history by id
            assignmentService.getWorkingHistory(history_id).then(function (response) {
                _this.workingHistoryDetail = response.data.data;
                // _this.workingHistoryDetail.start_date = parseDate(_this.workingHistoryDetail.start_date);
                // _this.workingHistoryDetail.end_date = parseDate(_this.workingHistoryDetail.end_date);

                if (_this.workingHistoryDetail.start_date == '' || _this.workingHistoryDetail.start_date == null || _this.workingHistoryDetail.start_date == undefined || _this.workingHistoryDetail.start_date == 'Invalid Date') {
                    _this.workingHistoryDetail.start_date = "N/A";
                } else {
                    _this.workingHistoryDetail.start_date = parseDate(_this.workingHistoryDetail.start_date);
                }

                if (_this.workingHistoryDetail.end_date == '' || _this.workingHistoryDetail.end_date == null || _this.workingHistoryDetail.end_date == undefined || _this.workingHistoryDetail.end_date == 'Invalid Date') {
                    _this.workingHistoryDetail.end_date = "N/A";
                } else {
                    _this.workingHistoryDetail.end_date = parseDate(_this.workingHistoryDetail.end_date);
                }

                if (_this.workingHistoryDetail.size == null) {
                    _this.workingHistoryDetail.size = "";
                }
                //
                // _this.workingHistoryDetail.name = _this.workingHistoryDetail.name;
                // _this.workingHistoryDetail.start_date = parseDate(_this.workingHistoryDetail.start_date);
                // _this.workingHistoryDetail.end_date = parseDate(_this.workingHistoryDetail.end_date);
                // _this.workingHistoryDetail.size = _this.workingHistoryDetail.size;
                // _this.workingHistoryDetail.role_title = _this.workingHistoryDetail.role_title;
                // _this.workingHistoryDetail.description = _this.workingHistoryDetail.description;
                // _this.workingHistoryDetail.my_responsibility = _this.workingHistoryDetail.my_responsibility;
                // _this.workingHistoryDetail.technology = _this.workingHistoryDetail.technology;


                $log.debug('$$$~~');
                $log.debug(_this.workingHistoryDetail);
            });
        };

        _this.workingHistorySubmit = function () {

            if (_this.isStartDateInvalidWithEndate || _this.isEndDateInvalidWithCurrent) {
                return;
            }

            if (_this.isEndDateInvalidWithStartDate || _this.isEndDateInvalidWithCurrent) {
                return;
            }


            if (_this.workingHistory.project_from == '' || _this.workingHistory.project_from == null || _this.workingHistory.project_from == undefined) {
                _this.workingHistory.project_from = null;
            }

            if (_this.workingHistory.project_to == '' || _this.workingHistory.project_to == null || _this.workingHistory.project_to == undefined) {
                _this.workingHistory.project_to = null;
            }

            if (_this.isSizeDayInvalid1) {
                return;
            }

            assignmentService.addWorkingHistory(_this.user_id, _this.workingHistory).then(function (response) {

                if (response.data.code === parseInt(200)) {
                    toastr.success('Add Working History successfully.', 'TMS');
                    // reset flag validate
                    _this.isStartDateInvalidWithEndate = false;
                    _this.isEndDateInvalidWithCurrent = false
                    // update data
                    assignmentService.getAllWorkingHistories(_this.user_id).then(function (response) {
                        _this.workingHistories = [];
                        angular.forEach(response.data.data, function (value, index) {
                            value.is_delete = false;
                            _this.workingHistories.push(value);
                        });

                        _this.workingHistories = _this.workingHistories.sort(compareFunction);

                        //_this.workingHistories = response.data.data;
                        //
                        var current = 0;
                        if (_this.pager !== undefined) {
                            current = _this.pager.currentPage
                        }

                        setPage(_this.workingHistories.length, 1, 5);

                        if (current + 1 === _this.pager.endPage) {
                            _this.seach(current + 1);
                        } else {
                            _this.seach(current);
                        }
                    });
                    //
                    _this.isDataChanged = false;
                    //
                    _this.isStartDateInvalidWithEndate = false;
                    _this.isStartDateInvalidWithCurrent = false;
                    _this.isEndDateInvalidWithCurrent = false;
                    _this.isEndDateInvalidWithStartDate = false;
                    _this.isStartDateInvalidWithEndate2 = false;
                    _this.isStartDateInvalidWithCurrent2 = false;
                    _this.isEndDateInvalidWithCurrent2 = false;
                    _this.isEndDateInvalidWithStartDate2 = false;
                } else {
                    toastr.error('Add working history failed.', 'TMS');
                }
            });
        };

        _this.updateWorkingHistorySubmit = function () {


            if (_this.isStartDateInvalidWithEndate2 || _this.isStartDateInvalidWithCurrent2) {
                return;
            }

            if (_this.isEndDateInvalidWithStartDate2 || _this.isEndDateInvalidWithCurrent2) {
                return;
            }


            if (_this.workingHistoryDetail.start_date == '' || _this.workingHistoryDetail.start_date == null || _this.workingHistoryDetail.start_date == undefined || _this.workingHistoryDetail.start_date == 'Invalid Date') {
                _this.workingHistoryDetail.start_date = null;
            }

            if (_this.workingHistoryDetail.end_date == '' || _this.workingHistoryDetail.end_date == null || _this.workingHistoryDetail.end_date == undefined || _this.workingHistoryDetail.end_date == 'Invalid Date') {
                _this.workingHistoryDetail.end_date = null;
            }

            if (_this.isSizeDayInvalid2) {
                return;
            }

            $log.debug('$$$');
            $log.debug(_this.workingHistoryDetail);

            if (_this.workingHistoryDetail.size == '' || _this.workingHistoryDetail.size == null || _this.workingHistoryDetail.size == undefined) {
                _this.workingHistoryDetail.size = 0;
            }

            assignmentService.updateWorkingHistory(_this.workingHistoryDetail.id, _this.workingHistoryDetail).then(function (response) {

                $log.debug(response);

                if (response.data.code == "200") {
                    toastr.success('Update Working History successfully.', 'TMS');
                    // update mode
                    _this.isViewMode = !_this.isViewMode;
                    // update data update for view
                    // _this.workingHistoryDetail.name = _this.workingHistoryDetail.name;
                    // _this.workingHistoryDetail.start_date = parseDate(_this.workingHistoryDetail.start_date);
                    // _this.workingHistoryDetail.end_date = parseDate(_this.workingHistoryDetail.end_date);
                    // _this.workingHistoryDetail.size = _this.workingHistoryDetail.size;
                    // _this.workingHistoryDetail.role_title = _this.workingHistoryDetail.role_title;
                    // _this.workingHistoryDetail.description = _this.workingHistoryDetail.description;
                    // _this.workingHistoryDetail.my_responsibility = _this.workingHistoryDetail.my_responsibility;
                    // _this.workingHistoryDetail.technology = _this.workingHistoryDetail.technology;
                    _this.history_temp = _this.workingHistoryDetail;

                    assignmentService.getAllWorkingHistories(_this.user_id).then(function (response) {
                        _this.workingHistories = [];
                        angular.forEach(response.data.data, function (value, index) {
                            value.is_delete = false;
                            _this.workingHistories.push(value);
                        });

                        _this.workingHistories = _this.workingHistories.sort(compareFunction);

                        //_this.workingHistories = response.data.data;
                        //
                        var current = _this.pager.currentPage;
                        setPage(_this.workingHistories.length, 1, 5);
                        _this.seach(current);

                    });

                    //
                    _this.isDataChanged = false;
                    //
                    _this.isStartDateInvalidWithEndate = false;
                    _this.isStartDateInvalidWithCurrent = false;
                    _this.isEndDateInvalidWithCurrent = false;
                    _this.isEndDateInvalidWithStartDate = false;
                    _this.isStartDateInvalidWithEndate2 = false;
                    _this.isStartDateInvalidWithCurrent2 = false;
                    _this.isEndDateInvalidWithCurrent2 = false;
                    _this.isEndDateInvalidWithStartDate2 = false;
                } else {
                    toastr.error('Update working history failed.', 'TMS');
                }
            });
        };

        _this.deleteWorkingHistorySubmit = function () {
            if (_this.array_delete.length) {
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/delete.html',
                    controller: 'deleteController',
                    backdrop: 'static',
                    resolve: {
                        content_modal: function () {
                            return {
                                section_title: 'Delete Working History',
                                msg: 'Are you sure you want to delete these assignments?'
                            };
                        }
                    }
                });
                modalInstance.result.then(function () {

                        assignmentService.deleteHistories(_this.array_delete).then(function (response) {
                            if (response.data.code === parseInt(200)) {
                                toastr.success('Delete Working History successfully.', 'TMS');
                                // update data
                                _this.workingHistories = [];
                                assignmentService.getAllWorkingHistories(_this.user_id).then(function (response) {
                                    angular.forEach(response.data.data, function (value, index) {
                                        value.is_delete = false;
                                        _this.workingHistories.push(value);
                                    });

                                    _this.workingHistories = _this.workingHistories.sort(compareFunction);

                                    //_this.workingHistories = response.data.data;
                                    //
                                    var current = _this.pager.currentPage;
                                    setPage(_this.workingHistories.length, 1, 5);

                                    if (current - 1 === _this.pager.endPage) {
                                        _this.seach(current - 1);
                                    } else {
                                        _this.seach(current);
                                    }
                                    _this.array_delete = [];

                                });
                            } else {
                                toastr.success('Delete Working History failed.', 'TMS');
                            }
                        });

                    },
                    function () {

                    });
            } else {
                toastr.warning('Please choose deleting Working History.', 'TMS');
            }
        };

        _this.checkExportInCV = function (history) {
            assignmentService.includeWorkingHistory(history.id, history.is_included).then(function (response) {
                if (response.data.code === parseInt(200)) {
                    if (history.is_included) {
                        toastr.success(history.name + " has been included in exporting CV.", 'TMS');
                    } else {
                        toastr.success(history.name + " has been removed in exporting CV.", 'TMS');
                    }
                } else {

                }


            })
        }

    }]);
});