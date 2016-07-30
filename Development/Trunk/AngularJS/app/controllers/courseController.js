define(['./module'], function(controllers) {
    'use strict';
    controllers.controller('courseController', ['$scope', '$http', '$routeParams', 'NgTableParams', '$uibModal', 'courseService', 'toastr', function courseController($scope, $http, $routeParams, NgTableParams, $uibModal, courseService, toastr) {
        var self = this;
        self.user_id = $scope.editEmpCtrl.user_id;
        self.editting_course_copy = null;
        self.editting_course = null;
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

        self.creating_course = {
            from_year: "YYYY",
            to_year: "YYYY",
            course_name: "",
            course_description: "",
            achievement: ""
        };

        self.courses = [];
        self.courses_update = [];

        /** table course*/
        self.tableCourse = new NgTableParams({
            //page: 1, // show first page
            //count: 5
        }, {
            counts: [],
            getData: function(params) {
                courseService.retrieveAllByUser_Id(self.user_id).then(function(res) {
                    if (res.data.code === 200) {
                        angular.forEach(res.data.data, function(value, key) {
                            self.courses.push({
                                data: angular.copy(value),
                                config: {
                                    issave: true,
                                    isedit: false,
                                    isdisable: false
                                }
                            });
                            self.courses_update.push({
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
                return self.courses;
            }
        });

        self.cancel = function(course, rowform) {
            self.isUpdateGridView = false;
            self.editting_course_copy.config.isedit = false;
            angular.forEach(self.courses_update, function(value, index) {
                if (angular.equals(value, course)) {
                    self.courses_update[index] = angular.copy(self.editting_course_copy);
                }
                value.config.isdisable = false;
            });
        };

        self.del = function(course) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/delete.html',
                controller: 'deleteController',
                backdrop: 'static',
                resolve: {
                    content_modal: function() {
                        return {
                            section_title: 'Delete Course',
                            msg: 'Are you sure you want to delete the course?'
                        };
                    }
                }
            });
            modalInstance.result.then(function() {
                    courseService.delete(course.data).then(function(res) {
                        if (res.data.code === 200) {
                            angular.forEach(self.courses_update, function(value, index) {
                                if (value.data.id === course.data.id) {
                                    self.courses_update.splice(index, 1);
                                    self.courses.splice(index, 1);
                                    callAlert("delete", course.data.course_name);
                                    return;
                                }
                            });
                        }
                    });
                },
                function() {

                });
        };

        self.save = function(course) {
            if (angular.isNumber(course.data.from_year) &&
                angular.isNumber(course.data.to_year) &&
                course.data.from_year <= course.data.to_year &&
                course.data.course_name &&
                course.data.course_description !== undefined &&
                course.data.achievement !== undefined &&
                course.data.course_name.length) {
                course.config.issave = true;
            } else {
                course.config.issave = false;
            }

            if (!course.config.issave) {
                course.config.issave = true;
            } else {
                courseService.update(course.data).then(function(res) {
                    if (res.data.code === 200) {
                        callAlert("update", course.data.course_name);
                        self.isUpdateGridView = false;
                        course.config.isedit = false;
                        angular.forEach(self.courses_update, function(value, index) {
                            self.courses_update[index].config.isdisable = false;
                        });
                        self.courses = null;
                        self.courses = angular.copy(self.courses_update);
                    } 
                });

            }

        };

        self.edit = function(course) {
            self.isUpdateGridView = true;
            course.config.isedit = true;
            self.editting_course = course;
            self.editting_course_copy = angular.copy(course);
            angular.forEach(self.courses_update, function(value, index) {
                if (!angular.equals(value, self.editting_course_copy)) {
                    self.courses_update[index].config.isdisable = true;
                }
            });
        };

        self.open = function(size) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/course.modal.html',
                controller: 'ModalCourseInstanceCtrl',
                size: size,
                backdrop: 'static',
                resolve: {
                    course: function() {
                        return angular.copy(self.creating_course);
                    }
                }
            });
            modalInstance.result.then(function(data) {
                    //dommy
                    data.user_id = self.user_id;
                    courseService.create(data).then(function(res) {
                        if (res.data.code === 200) {
                            var newdata = {
                                data: res.data.data,
                                config: {
                                    issave: true,
                                    isedit: false,
                                    isdisable: false
                                }
                            };
                            self.courses.push(angular.copy(newdata));
                            self.courses_update.push(angular.copy(newdata));
                            callAlert("add", newdata.data.course_name);
                        }
                    });
                },
                function() {

                });
        };
    }]);

    controllers.controller('ModalCourseInstanceCtrl', function($scope, $uibModalInstance, course) {
        $scope.course = course;
        $scope.isAdd = false;
        $scope.$watch('course', function(newValue, oldValue) {
            if (angular.isNumber(newValue.from_year) &&
                angular.isNumber(newValue.to_year) &&
                newValue.from_year <= newValue.to_year &&
                newValue.course_name &&
                newValue.course_description !== undefined &&
                newValue.achievement !== undefined &&
                newValue.course_name.length > 0) {
                $scope.isAdd = true;
            } else {
                $scope.isAdd = false;
            }
        }, true);

        $scope.add = function() {
            angular.forEach($scope.courseForm.$error.required, function(field) {
                field.$setDirty();
            });
            if ($scope.isAdd) {
                $uibModalInstance.close($scope.course);
            }

        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    });
});