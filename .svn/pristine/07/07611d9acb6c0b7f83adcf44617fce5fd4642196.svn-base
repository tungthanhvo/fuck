define(['./module'], function(controllers) {
    'use strict';
    controllers.controller('courseController', ['$scope', '$http', '$routeParams', 'NgTableParams', '$uibModal', 'courseService', function courseController($scope, $http, $routeParams, NgTableParams, $uibModal, courseService) {
        var self = this;
        self.user_id = $scope.editEmpCtrl.user_id;
        self.editting_course_copy = null;
        self.editting_course = null;
        self.isUpdateGridView = false;
        self.alerts = {
            "update": {
                type: 'success',
                msg: 'Course Name has been updated'
            },
            "delete": {
                type: 'success',
                msg: 'Course Name has been removed'
            },
            "add": {
                type: 'success',
                msg: 'Course Name has been added'
            }
        };

        function callAlert(alert) {
            self.alert = alert;
            self.isshowalert = true;
        }

        self.closeAlert = function() {
            self.isshowalert = false;
        }

        self.creating_course = {
            from_year: "YYYY",
            to_year: "YYYY",
            course_name: "",
            course_description: "",
            achievement: ""
        };

        self.courses = [];

        /** table course*/
        self.tableCourse = new NgTableParams({
            //page: 1, // show first page
            //count: 5
        }, {
            counts: [],
            getData: function(params) {
                var entries = courseService.retrieveAllByUser_Id(self.user_id).then(function(res) {
                    if (res.data.code == 200) {
                        angular.forEach(res.data.data, function(value, key) {
                            self.courses.push({
                                data: value,
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
            angular.forEach(self.courses, function(value, index) {
                if (angular.equals(value, course)) {
                    self.courses[index] = angular.copy(self.editting_course_copy);
                }
                value.config.isdisable = false;
            });
        };

        self.del = function(course) {
            courseService.delete(course.data).then(function(res) {
                if (res.data.code == 200) {
                    self.courses.splice(course, 1);
                    callAlert(self.alerts["delete"]);
                } else {

                }
            });

        };

        self.save = function(course) {
            if (angular.isNumber(course.data.from_year) &&
                angular.isNumber(course.data.to_year) &&
                course.data.from_year < course.data.to_year &&
                course.data.course_name &&
                course.data.course_description != undefined &&
                course.data.achievement != undefined &&
                course.data.course_name.length) {
                course.config.issave = true;
            } else {
                course.config.issave = false;
            }

            if (!course.config.issave) {
                course.config.issave = true;
            } else {
                courseService.update(course.data).then(function(res) {
                    if (res.data.code == 200) {
                        callAlert(self.alerts["update"]);
                    } else {

                    }
                });
                self.isUpdateGridView = false;
                callAlert(self.alerts[1]);
                course.config.isedit = false;
                angular.forEach(self.courses, function(value, index) {
                    self.courses[index].config.isdisable = false;
                });
            }

        };

        self.edit = function(course) {
            debugger;
            self.isUpdateGridView = true;
            course.config.isedit = true;
            self.editting_course = course;
            self.editting_course_copy = angular.copy(course);
            angular.forEach(self.courses, function(value, index) {
                if (!angular.equals(value, self.editting_course_copy)) {
                    self.courses[index].config.isdisable = true;
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
                        if (res.data.code == 200) {
                            var newdata = {
                                data: res.data.data,
                                config: {
                                    issave: true,
                                    isedit: false,
                                    isdisable: false
                                }
                            };
                            self.courses.push(newdata);
                            callAlert(self.alerts["add"]);
                        } else {

                        }
                    });
                },
                function() {

                });
        };
    }]);

    controllers.controller('ModalCourseInstanceCtrl', function($scope, $uibModalInstance, course) {
        $scope.course = course;
        debugger;
        $scope.isAdd = false;
        $scope.$watch('course', function(newValue, oldValue) {
            if (angular.isNumber(newValue.from_year) &&
                angular.isNumber(newValue.to_year) &&
                newValue.from_year < newValue.to_year &&
                newValue.course_name &&
                newValue.course_desciption != undefined &&
                newValue.achievement != undefined &&
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