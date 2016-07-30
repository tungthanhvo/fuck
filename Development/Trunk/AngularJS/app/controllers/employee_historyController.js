define(['./module'], function(controllers) {
    'use strict';
    controllers.controller('employee_historyController', ['$scope', '$http', '$routeParams', 'NgTableParams', '$uibModal', 'employee_historyService', 'toastr', function employee_historyController($scope, $http, $routeParams, NgTableParams, $uibModal, employee_historyService, toastr) {
        var self = this;
        self.user_id = $scope.editEmpCtrl.user_id;
        self.editting_employee_history_copy = null;
        self.editting_employee_history = null;
        self.isUpdateGridView = false;
        self.alerts = {
            "update": function(name) {
                toastr.success(name + ' has been updated.', 'TMS');
            },
            "delete": function(name) {
                toastr.success(name + ' has been removed.', 'TMS');
            },
            "add": function(name) {
                toastr.success(name + ' has been added.', 'TMS');
            }
        };

        function callAlert(alert, name) {
            self.alerts[alert](name);
        }

        self.creating_employee_history = {
            from_year: "YYYY",
            to_year: "YYYY",
            company_name: "",
            position: ""
        };

        self.employee_histories = [];
        self.employee_histories_update = [];

        /** table employee_history*/
        self.tableEmployeeHistory = new NgTableParams({
            //page: 1, // show first page
            //count: 5
        }, {
            counts: [],
            getData: function(params) {
                employee_historyService.retrieveAllByUser_Id(self.user_id).then(function(res) {
                    if (res.data.code === 200) {
                        angular.forEach(res.data.data, function(value, key) {
                            self.employee_histories.push({
                                data: angular.copy(value),
                                config: {
                                    issave: true,
                                    isedit: false,
                                    isdisable: false
                                }
                            });
                            self.employee_histories_update.push({
                                data: angular.copy(value),
                                config: {
                                    issave: true,
                                    isedit: false,
                                    isdisable: false
                                }
                            });
                        });
                    }
                });
                return self.employee_histories;
            }
        });

        self.cancel = function(employee_history, rowform) {
            self.isUpdateGridView = false;
            self.editting_employee_history_copy.config.isedit = false;
            angular.forEach(self.employee_histories_update, function(value, index) {
                if (angular.equals(value, employee_history)) {
                    self.employee_histories_update[index] = angular.copy(self.editting_employee_history_copy);
                }
                value.config.isdisable = false;
            });
        };

        self.del = function(employee_history) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/delete.html',
                controller: 'deleteController',
                backdrop: 'static',
                resolve: {
                    content_modal: function() {
                        return {
                            section_title: 'Delete Employee History',
                            msg: 'Are you sure you want to delete the employee history?'
                        };
                    }
                }
            });
            modalInstance.result.then(function() {
                    employee_historyService.delete(employee_history.data).then(function(res) {
                        if (res.data.code === 200) {
                            angular.forEach(self.employee_histories_update, function(value, index) {
                                if (value.data.id === employee_history.data.id) {
                                    self.employee_histories_update.splice(index, 1);
                                    self.employee_histories.splice(index, 1);
                                    callAlert("delete", employee_history.data.company_name);
                                    return;
                                }
                            });
                        }
                    });
                },
                function() {

                });
        };

        self.save = function(employee_history) {
            if (angular.isNumber(employee_history.data.from_year) &&
                angular.isNumber(employee_history.data.to_year) &&
                employee_history.data.from_year <= employee_history.data.to_year &&
                employee_history.data.company_name &&
                employee_history.data.company_name.length) {
                employee_history.config.issave = true;
            } else {
                employee_history.config.issave = false;
            }

            if (!employee_history.config.issave) {
                employee_history.config.issave = true;
            } else {
                employee_historyService.update(employee_history.data).then(function(res) {
                    if (res.data.code === 200) {
                        callAlert("update", employee_history.data.company_name);
                        self.isUpdateGridView = false;
                        employee_history.config.isedit = false;
                        angular.forEach(self.employee_histories_update, function(value, index) {
                            self.employee_histories_update[index].config.isdisable = false;
                        });
                        self.employee_histories = null;
                        self.employee_histories = angular.copy(self.employee_histories_update);
                    }
                });

            }

        };

        self.edit = function(employee_history) {
            self.isUpdateGridView = true;
            employee_history.config.isedit = true;
            self.editting_employee_history = employee_history;
            self.editting_employee_history_copy = angular.copy(employee_history);
            angular.forEach(self.employee_histories_update, function(value, index) {
                if (!angular.equals(value, self.editting_employee_history_copy)) {
                    self.employee_histories_update[index].config.isdisable = true;
                    return;
                }
            });
        };

        self.open = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/employee_history.modal.html',
                controller: 'Modalemployee_historyInstanceCtrl',
                size: size,
                backdrop: 'static',
                resolve: {
                    employee_history: function() {
                        return angular.copy(self.creating_employee_history);
                    }
                }
            });
            modalInstance.result.then(function(data) {
                    //dommy
                    data.user_id = self.user_id;
                    employee_historyService.create(data).then(function(res) {
                        if (res.data.code === 200) {
                            var newdata = {
                                data: res.data.data,
                                config: {
                                    issave: true,
                                    isedit: false,
                                    isdisable: false
                                }
                            };
                            self.employee_histories.push(angular.copy(newdata));
                            self.employee_histories_update.push(angular.copy(newdata));
                            callAlert("add", newdata.data.company_name);
                        }
                    });
                },
                function() {

                });
        };
    }]);

    controllers.controller('Modalemployee_historyInstanceCtrl', function($scope, $uibModalInstance, employee_history) {
        $scope.employee_history = employee_history;
        $scope.isAdd = false;
        $scope.$watch('employee_history', function(newValue, oldValue) {
            if (angular.isNumber(newValue.from_year) &&
                angular.isNumber(newValue.to_year) &&
                newValue.from_year <= newValue.to_year &&
                newValue.company_name &&
                newValue.company_name.length > 0) {
                $scope.isAdd = true;
            } else {
                $scope.isAdd = false;
            }
        }, true);

        $scope.add = function() {
            angular.forEach($scope.empHistoryForm.$error.required, function(field) {
                field.$setDirty();
            });
            if ($scope.isAdd) {
                $uibModalInstance.close($scope.employee_history);
            }

        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });
});