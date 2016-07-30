define(['./module'], function(controllers) {
    'use strict';
    controllers.controller('educationController', ['$scope', '$http', '$routeParams', 'NgTableParams', '$uibModal', 'educationService', 'toastr', function EducationController($scope, $http, $routeParams, NgTableParams, $uibModal, educationService, toastr) {
        var self = this;
        self.user_id = $scope.editEmpCtrl.user_id;
        self.editting_education_copy = null;
        self.editting_education = null;
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

        self.creating_education = {
            from_year: "YYYY",
            to_year: "YYYY",
            university_college_name: "",
            major: ""
        };

        self.educations = [];
        self.educations_update = [];

        /** table education*/
        self.tableEducation = new NgTableParams({
            //page: 1, // show first page
            //count: 5
        }, {
            counts: [],
            getData: function(params) {
               educationService.retrieveAllByUser_Id(self.user_id).then(function(res) {
                    if (res.data.code === 200) {
                        angular.forEach(res.data.data, function(value, key) {
                            self.educations.push({
                                data: angular.copy(value),
                                config: {
                                    issave: true,
                                    isedit: false,
                                    isdisable: false
                                }
                            });
                            self.educations_update.push({
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
                return self.educations;
            }
        });

        self.cancel = function(education, rowform) {
            self.isUpdateGridView = false;
            self.editting_education_copy.config.isedit = false;
            angular.forEach(self.educations_update, function(value, index) {
                if (angular.equals(value, education)) {
                    self.educations_update[index] = angular.copy(self.editting_education_copy);
                }
                value.config.isdisable = false;
            });
        };

        self.del = function(education) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/delete.html',
                controller: 'deleteController',
                backdrop: 'static',
                resolve: {
                    content_modal: function() {
                        return {
                            section_title: 'Delete Education',
                            msg: 'Are you sure you want to delete the education?'
                        };
                    }
                }
            });
            modalInstance.result.then(function() {
                    educationService.delete(education.data).then(function(res) {
                        if (res.data.code === 200) {
                            angular.forEach(self.educations_update, function(value, index) {
                                if (value.data.id === education.data.id) {
                                    self.educations_update.splice(index, 1);
                                    self.educations.splice(index, 1);
                                    callAlert("delete", education.data.university_college_name);
                                    return;
                                }
                            });
                        } 
                    });
                },
                function() {

                });
        };

        self.save = function(education) {
            if (angular.isNumber(education.data.from_year) &&
                angular.isNumber(education.data.to_year) &&
                education.data.from_year <= education.data.to_year &&
                education.data.university_college_name && education.data.major &&
                education.data.university_college_name.length && education.data.major.length) {
                education.config.issave = true;
            } else {
                education.config.issave = false;
            }
            if (!education.config.issave) {
                education.config.issave = true;
            } else {
                educationService.update(education.data).then(function(res) {
                    if (res.data.code === 200) {
                        callAlert("update", education.data.university_college_name);
                        self.isUpdateGridView = false;
                        education.config.isedit = false;
                        angular.forEach(self.educations_update, function(value, index) {
                            self.educations_update[index].config.isdisable = false;
                        });
                        self.educations = null;
                        self.educations = angular.copy(self.educations_update);
                    } 
                });

            }

        };

        self.edit = function(education) {
            self.isUpdateGridView = true;
            education.config.isedit = true;
            self.editting_education = education;
            self.editting_education_copy = angular.copy(education);
            angular.forEach(self.educations_update, function(value, index) {
                if (!angular.equals(value, self.editting_education_copy)) {
                    self.educations_update[index].config.isdisable = true;
                    return;
                }
            });
        };

        self.open = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/education.modal.html',
                controller: 'ModalEduInstanceCtrl',
                size: size,
                backdrop: 'static',
                resolve: {
                    education: function() {
                        return angular.copy(self.creating_education);
                    }
                }
            });
            modalInstance.result.then(function(data) {
                    data.user_id = self.user_id;
                    educationService.create(data).then(function(res) {
                        if (res.data.code === 200) {
                            var newdata = {
                                data: res.data.data,
                                config: {
                                    issave: true,
                                    isedit: false,
                                    isdisable: false
                                }
                            };
                            self.educations.push(angular.copy(newdata));
                            self.educations_update.push(angular.copy(newdata));
                            callAlert("add", newdata.data.university_college_name);
                        } 
                    });
                },
                function() {

                });
        };

    }]);

    controllers.controller('ModalEduInstanceCtrl', function($scope, $uibModalInstance, education) {
        $scope.education = education;
        $scope.isAdd = false;
        $scope.$watch('education', function(newValue, oldValue) {
            if (angular.isNumber(newValue.from_year) &&
                angular.isNumber(newValue.to_year) &&
                newValue.from_year <= newValue.to_year &&
                newValue.university_college_name && newValue.major &&
                newValue.university_college_name.length > 0 && newValue.major.length > 0) {
                $scope.isAdd = true;
            } else {
                $scope.isAdd = false;
            }
        }, true);

        $scope.add = function() {
            angular.forEach($scope.educationForm.$error.required, function(field) {
                field.$setDirty();
            });

            if ($scope.isAdd) {
                $uibModalInstance.close($scope.education);
            }

        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });
});