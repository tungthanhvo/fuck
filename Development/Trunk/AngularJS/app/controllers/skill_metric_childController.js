define(['./module', 'ui-bootstrap'], function(controllers) {
    'use strict';
    controllers.controller("skillMetricChildController", ['$scope', '$http', 'metadataService', '$rootScope', '$uibModal', function($scope, $http, metadataService, $rootScope, $uibModal) {
        var self = this;
        self.lastyearsused = [];
        self.adding_skill_metrics = [];
        self.metadata_experience = [];
        self.metadata_expertise = [];

        function listyears(startyear) {
            var curr_year = (new Date()).getFullYear();
            self.lastyearsused = [];
            for (var i = curr_year; i >= startyear; i--) {
                self.lastyearsused.push(i);
            }
        }
        self.init = function() {
            listyears($rootScope.year_dayofbirth);
            self.metadata_expertise = metadataService.skillMetric.expertise;
            self.metadata_experience = metadataService.skillMetric.experience;
        }
        $rootScope.$on('changelistyears', function(event, data) {
            listyears(data.year);
        });

        self.chooseExpertise = function(level) {
            self.skillmetric.expertise = self.metadata_expertise[level - 1];
            self.skillmetric.status.ischanged = true;
        }
        self.changeLastYearUsed = function() {
            self.skillmetric.status.ischanged = true;
            if (!angular.isNumber(self.skillmetric.last_year_used)) {
                self.skillmetric.status.islastyearused = false;
            } else {
                self.skillmetric.status.islastyearused = true;
            }
        }

        self.changeExperience = function() {
            self.skillmetric.status.ischanged = true;
            if (!angular.isNumber(self.skillmetric.experience_id)) {
                self.skillmetric.status.isexperience = false;
            } else {
                self.skillmetric.status.isexperience = true;
            }
        }

        self.removeSkillMetric = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/delete.html',
                controller: 'deleteController',
                backdrop: 'static',
                resolve: {
                    content_modal: function() {
                        return {
                            section_title: 'Delete Skill Metric',
                            msg: 'Are you sure you want to delete the selected skill metric?'
                        };
                    }
                }
            });
            modalInstance.result.then(function() {
                    $rootScope.$broadcast('deletingskillmetric', {
                        data: self.skillmetric // send whatever you want
                    });
                },
                function() {

                });
        }
    }]);
})