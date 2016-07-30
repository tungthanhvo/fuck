define(['./module'], function(controllers) {
    'use strict';
    controllers.controller('educationController', ['$scope', '$http', '$routeParams', 'NgTableParams', '$uibModal', 'educationService', function EducationController($scope, $http, $routeParams, NgTableParams, $uibModal, educationService) {
        var self = this;
        self.user_id = $scope.editEmpCtrl.user_id;
        self.editting_education_copy = null;
        self.editting_education = null;
        self.isUpdateGridView = false;
        self.alerts = {
            "update": {
                type: 'success',
                msg: 'University/College has been updated'
            },
            "delete": {
                type: 'success',
                msg: 'University/College has been removed'
            },
            "add": {
                type: 'success',
                msg: 'University/College has been added'
            }
        };

        function callAlert(alert) {
            self.alert = alert;
            self.isshowalert = true;
        }

        self.closeAlert = function() {
            self.isshowalert = false;
        }

        self.creating_education = {
            from_year: "YYYY",
            to_year: "YYYY",
            university_college_name: "",
            major: ""
        };

        self.educations = [];

        /** table education*/
        self.tableEducation = new NgTableParams({
            //page: 1, // show first page
            //count: 5
        }, {
            counts: [],
            getData: function(params) {
                var entries = educationService.retrieveAllByUser_Id(self.user_id).then(function(res) {
                    if (res.data.code == 200) {
                        angular.forEach(res.data.data, function(value, key) {
                            self.educations.push({
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
                return self.educations;
            }
        });

        self.cancel = function(education, rowform) {
            self.isUpdateGridView = false;
            self.editting_education_copy.config.isedit = false;
            angular.forEach(self.educations, function(value, index) {
                if (angular.equals(value, education)) {
                    self.educations[index] = angular.copy(self.editting_education_copy);
                }
                value.config.isdisable = false;
            });
        };

        self.del = function(education) {
            educationService.delete(education.data).then(function(res) {
                if (res.data.code == 200) {
                    self.educations.splice(education, 1);
                    callAlert(self.alerts["delete"]);
                } else {

                }
            });

        };

        self.save = function(education) {
            if (angular.isNumber(education.data.from_year) &&
                angular.isNumber(education.data.to_year) &&
                education.data.from_year < education.data.to_year &&
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
                    if (res.data.code == 200) {
                        callAlert(self.alerts["update"]);
                    } else {

                    }
                });

                self.isUpdateGridView = false;
                //http put here
                //if success go down
                callAlert(self.alerts[1]);
                education.config.isedit = false;
                angular.forEach(self.educations, function(value, index) {
                    self.educations[index].config.isdisable = false;
                });
            }

        };

        self.edit = function(education) {
            self.isUpdateGridView = true;
            education.config.isedit = true;
            self.editting_education = education;
            self.editting_education_copy = angular.copy(education);
            angular.forEach(self.educations, function(value, index) {
                if (!angular.equals(value, self.editting_education_copy)) {
                    self.educations[index].config.isdisable = true;
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
                    //dommy
                    data.user_id = self.user_id;
                    educationService.create(data).then(function(res) {
                        if (res.data.code == 200) {
                            var newdata = {
                                data: res.data.data,
                                config: {
                                    issave: true,
                                    isedit: false,
                                    isdisable: false
                                }
                            };
                            self.educations.push(newdata);
                            callAlert(self.alerts["add"]);
                        } else {

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
                newValue.from_year < newValue.to_year &&
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