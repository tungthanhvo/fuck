define(['./module', 'jquery', 'select2'], function(controllers) {
    'use strict';
    controllers.controller('skillMetricController', ['$scope', '$http', '$routeParams', 'metadataService', '$uibModal', 'skillmetricsService', '$rootScope', 'toastr', function($scope, $http, $routeParams, metadataService, $uibModal, skillmetricsService, $rootScope, toastr) {
        var self = this;
        self.user_id = $scope.editEmpCtrl.user_id;

        self.alerts = {
            "unchoice": function() {
                toastr.warning('Please select Skill Metric.', 'TMS');
            },
            "exist": function() {
                toastr.warning('The Skill Metric is already exist.', 'TMS');
            },
            "delete": function() {
                toastr.success('Skill Metric has been deleted.', 'TMS');
            },
            "save": function() {
                toastr.success('Skill Metric has been saved.', 'TMS');
            }
        };

        self.metadata_skillchildren = [];
        self.metadata_expertise = [];
        self.metadata_experience = [];
        self.metadata_skillparents = [];
        self.select2val = null;
        self.skill_metrics = [];
        self.copy_skill_metrics = [];

        function callAlert(alert) {
            self.alerts[alert]();
        }

        self.filterSkillMetric = function(skill_metric) {
            return !skill_metric.is_removed;
        }

        self.init = function() {
            skillmetricsService.getDOB(self.user_id).then(function(res) {
                $rootScope.year_dayofbirth = (new Date(res.data.data.dob)).getFullYear();
                skillmetricsService.retrieveAllByUser_Id(self.user_id).then(function(res) {
                    self.metadata_expertise = metadataService.skillMetric.expertise;
                    self.metadata_experience = metadataService.skillMetric.experience;
                    self.metadata_skillparents = metadataService.skillMetric.skillParents;
                    self.start_index_skillchildren = self.metadata_skillparents.length + 1;
                    //self.metadata_skillchildren = metadataService.skillMetric.skillChildren;
                    angular.forEach(metadataService.skillMetric.skillChildren, function(skillmetric) {
                        skillmetric.is_removed = false;
                        self.metadata_skillchildren.push(skillmetric);
                    });
                    angular.forEach(res.data.data, function(value, index) {
                        var temp = {
                            id: value.id,
                            last_year_used: value.last_year_used,
                            experience_id: value.experience_id,
                            is_verified: value.is_verified,
                            expertise: self.metadata_expertise[value.expertise_id - 1],
                            skill: {
                                id: value.skill.id,
                                name: value.skill.name,
                                parent_id: self.metadata_skillparents[value.skill.parent_id - 1].name,
                            },
                            status: {
                                issave: true,
                                isexpertise: true,
                                isexperience: true,
                                islastyearused: true,
                                ischanged: false,
                            },
                            user_id: value.user_id
                        };
                        self.metadata_skillchildren[temp.skill.id - self.start_index_skillchildren].is_removed = true;
                        self.skill_metrics.push(temp);
                    });
                    self.copy_skill_metrics = angular.copy(self.skill_metrics);
                });
            })
        }
        self.id = 0;
        self.addSkillMetric = function() {
            /*if (self.select2val === null) {
                callAlert("unchoice");
                return;
            }
            var isexist = false;
            angular.forEach(self.skill_metrics, function(value, index) {
                if (value.skill.id === self.select2val) {
                    isexist = true;
                    return;
                }
            });*/
            //if (!isexist) {
            var first_id = self.metadata_skillchildren[0].id;
            var adding_skill_metric = self.metadata_skillchildren[self.select2val - first_id];
            self.id--;
            var temp = {
                id_new: self.id,
                last_year_used: "",
                experience_id: "",
                is_verified: false,
                expertise: {
                    id: 0,
                    level: 0,
                    description: ""
                },
                skill: {
                    id: adding_skill_metric.id,
                    name: adding_skill_metric.name,
                    parent_id: adding_skill_metric.parent_id,
                },
                status: {
                    issave: false,
                    isexpertise: true,
                    isexperience: true,
                    islastyearused: true,
                    ischanged: false,
                },
                user_id: self.user_id
            };
            self.metadata_skillchildren[temp.skill.id - self.start_index_skillchildren].is_removed = true;
            self.skill_metrics.push(temp);
            //} else {
            //   callAlert("exist");
            //}

        }

        self.save = function() {
            var createupdate_skill_metrics = [];
            var issave = true;
            angular.forEach(self.skill_metrics, function(value, index) {
                if (value.status.ischanged) {
                    createupdate_skill_metrics.push(value);
                }

                if (!angular.isNumber(value.last_year_used)) {
                    value.status.islastyearused = false;
                    issave = false;
                } else {
                    value.status.islastyearused = true;
                }

                if (!angular.isNumber(value.experience_id)) {
                    value.status.isexperience = false;
                    issave = false;
                } else {
                    value.status.isexperience = true;
                }

                if (value.expertise.level === 0) {
                    value.status.isexpertise = false;
                    issave = false;
                } else {
                    value.status.isexpertise = true;
                }
            });

            if (issave && createupdate_skill_metrics.length) {
                skillmetricsService.createandupdate(self.user_id, createupdate_skill_metrics).then(function(res) {
                    if (res.data.code === 200) {
                        self.skill_metrics = [];
                        angular.forEach(res.data.data, function(value, index) {
                            var temp = {
                                id: value.id,
                                last_year_used: value.last_year_used,
                                experience_id: value.experience_id,
                                is_verified: value.is_verified,
                                expertise: self.metadata_expertise[value.expertise_id - 1],
                                skill: {
                                    id: value.skill.id,
                                    name: value.skill.name,
                                    parent_id: self.metadata_skillparents[value.skill.parent_id - 1].name,
                                },
                                status: {
                                    issave: true,
                                    isexpertise: true,
                                    isexperience: true,
                                    islastyearused: true,
                                    ischanged: false
                                },
                                user_id: value.user_id
                            };
                            self.metadata_skillchildren[temp.skill.id - self.start_index_skillchildren].is_removed = true;
                            self.skill_metrics.push(temp);
                            //self.skill_metrics.push(temp);
                        });
                        callAlert("save");
                        self.copy_skill_metrics = angular.copy(self.skill_metrics);
                    }
                })
            }
        }
        $rootScope.$on('deletingskillmetric', function(event, data) {
            if (!data.data.status.issave) {
                self.metadata_skillchildren[data.data.skill.id - self.start_index_skillchildren].is_removed = false;
                angular.forEach(self.skill_metrics, function(value, index) {
                    if (value.id_new === data.data.id_new) {
                        self.skill_metrics.splice(index, 1);
                        callAlert("delete");
                        return;
                    }
                });
            } else {
                skillmetricsService.delete(data.data).then(function(res) {
                    if (res.data.code === 200) {
                        self.metadata_skillchildren[data.data.skill.id - self.start_index_skillchildren].is_removed = false;
                        angular.forEach(self.skill_metrics, function(value, index) {
                            if (value.id === data.data.id) {
                                self.skill_metrics.splice(index, 1);
                                callAlert("delete");
                                self.copy_skill_metrics.splice(index, 1);
                                return;
                            }
                        });

                    }

                });
            }
        });

        self.cancel = function() {
            angular.forEach(self.skill_metrics, function(skill_metric) {
                if (!skill_metric.status.issave) {
                    self.metadata_skillchildren[skill_metric.skill.id - self.start_index_skillchildren].is_removed = false;
                }
            })
            self.skill_metrics = angular.copy(self.copy_skill_metrics);
        }
    }]);
});