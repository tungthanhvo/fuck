define(['./module', 'config'], function(controllers, config) {
    'use strict';
    var apiServer = config.api_server;
    controllers.controller('editEmployeeController', ['$rootScope', '$scope', '$location', '$http', '$log', '$routeParams', 'employeeService', 'smoothScroll', 'exportCVService', function($rootScope, $scope, $location, $http, $log, $routeParams, employeeService, smoothScroll, exportCVService) {
        // skeleton
        var _this = this;


        _this.user_id = $routeParams.user_id;
        _this.export_url = apiServer + '/cv/export/' + _this.user_id.toString() + '/';

        _this.disableAnotherTab = false;

        _this.submitWord = function() {
                var id = 1;
                exportCVService.exportWord(id)
                    .success(function(data, status, headers, config) {

                    })
                    .error(function(data, status, headers, config) {
                        // Handle export word error
                    })
            }
            /**
             * get dob for skill metric
             */
        _this.initForSkillMetric = function() {
            skillmetricsService.getDOB(self.user_id).then(function(res) {
                $rootScope.year_dayofbirth = (new Date(res.data.data.dob)).getFullYear();
            });
        }

        /**
         * Employee information
         */

        // check arrow
        _this.isPersonalCollapse = true;
        _this.isPersonalCollapseEdit = true;

        _this.isCompanyCollapse = true;
        _this.isCompanyCollapseEdit = true;

        _this.isTechnicalCollapse = true;
        _this.isTechnicalCollapseEdit = true;

        _this.isEducationCollapse = true;
        _this.isEducationCollapseEdit = true;

        _this.isCourseCollapse = true;
        _this.isCourseCollapseEdit = true;

        _this.isHistoryCollapse = true;
        _this.isHistoryCollapseEdit = true;

        _this.isAdditionalCollapse = true;
        _this.isAdditionalCollapseEdit = true;

        _this.scrollToTop = function() {
            var element = document.getElementById('top-page');
            smoothScroll(element);
        }


        _this.changePersonalCollapse = function() {
            _this.isPersonalCollapse = !_this.isPersonalCollapse;
            // smooth scroll
            var element = document.getElementById('personalSmoothScrollView');
            smoothScroll(element);
        };
        _this.changePersonalCollapseEdit = function() {
            _this.isPersonalCollapseEdit = !_this.isPersonalCollapseEdit;
            // smooth scroll
            var element = document.getElementById('personalSmoothScrollEdit');
            smoothScroll(element);
        };

        _this.changeCompanyCollapse = function() {
            _this.isCompanyCollapse = !_this.isCompanyCollapse;
            // smooth scroll
            var element = document.getElementById('companySmoothScrollView');
            smoothScroll(element);
        };
        _this.changeCompanyCollapseEdit = function() {
            _this.isCompanyCollapseEdit = !_this.isCompanyCollapseEdit;
            // smooth scroll
            var element = document.getElementById('companySmoothScrollEdit');
            smoothScroll(element);
        };


        _this.changeTechnicalCollapse = function() {
            _this.isTechnicalCollapse = !_this.isTechnicalCollapse;
            // smooth scroll
            var element = document.getElementById('technicalSkillSmoothScrollView');
            smoothScroll(element);
        };
        _this.changeTechnicalCollapseEdit = function() {
            _this.isTechnicalCollapseEdit = !_this.isTechnicalCollapseEdit;
            // smooth scroll
            var element = document.getElementById('technicalSkillSmoothScrollEdit');
            smoothScroll(element);
        };

        _this.changeEducationCollapse = function() {
            _this.isEducationCollapse = !_this.isEducationCollapse;
            // smooth scroll
            var element = document.getElementById('educationSmoothScrollView');
            smoothScroll(element);
        };
        _this.changeEducationCollapseEdit = function() {
            _this.isEducationCollapseEdit = !_this.isEducationCollapseEdit;
            // smooth scroll
            var element = document.getElementById('educationSmoothScrollEdit');
            smoothScroll(element);
        };

        _this.changeCourseCollapse = function() {
            _this.isCourseCollapse = !_this.isCourseCollapse;
            // smooth scroll
            var element = document.getElementById('courseSmoothScrollView');
            smoothScroll(element);
        };
        _this.changeCourseCollapseEdit = function() {
            _this.isCourseCollapseEdit = !_this.isCourseCollapseEdit;
            // smooth scroll
            var element = document.getElementById('courseSmoothScrollEdit');
            smoothScroll(element);
        };

        _this.changeHistoryCollapse = function() {
            _this.isHistoryCollapse = !_this.isHistoryCollapse;
            // smooth scroll
            var element = document.getElementById('historySmoothScrollView');
            smoothScroll(element);
        };
        _this.changeHistoryCollapseEdit = function() {
            _this.isHistoryCollapseEdit = !_this.isHistoryCollapseEdit;
            // smooth scroll
            var element = document.getElementById('historySmoothScrollEdit');
            smoothScroll(element);
        };

        _this.changeAdditionalCollapse = function() {
            _this.isAdditionalCollapse = !_this.isAdditionalCollapse;
            // smooth scroll
            var element = document.getElementById('additionalSmoothScrollView');
            smoothScroll(element);
        };
        _this.changeAdditionalCollapseEdit = function() {
            _this.isAdditionalCollapseEdit = !_this.isAdditionalCollapseEdit;
            // smooth scroll
            var element = document.getElementById('additionalSmoothScrollEdit');
            smoothScroll(element);
        };

        _this.full_name = "";
        _this.married_status = 0;
        _this.company_email = "";
        _this.staff_code = "";
        _this.job_title_name = "";
        _this.imageUrl = "";
        //check avatar
        _this.isHasImageAvatar = true;

        // store DOB to check date for company_join_date
        //_this.company_join_date_validate = "";

        employeeService.getUserInfo(_this.user_id).then(function(response) {
            if (response.data.data == null) {
                $location.path('/home');
                return;
            } else {
                var userInfo = response.data.data;

                _this.full_name = userInfo.first_name + ' ' + userInfo.last_name;
                $scope.$emit('setTitle', {
                    text: "Employee: " + _this.full_name
                });
                _this.married_status = userInfo.married_status;
                _this.company_email = userInfo.company_email;
                _this.staff_code = userInfo.staff_code;
                _this.imageUrl = userInfo.avatar;

                if (_this.imageUrl == '' || _this.imageUrl == null || _this.imageUrl == undefined) {
                    _this.isHasImageAvatar = false;
                } else {
                    _this.isHasImageAvatar = true;
                    // process image url
                    if (_this.imageUrl.indexOf("-") == -1) {
                        _this.imageUrl = _this.imageUrl.substring(0, _this.imageUrl.lastIndexOf("."));
                        $rootScope.imageProfile = _this.imageUrl;
                    }
                }

                _this.company_join_date_validate = userInfo.dob;

                // get job_title from competence_job_title_id
                employeeService.getInfo(userInfo.competence_job_title_id).then(function(response) {
                    var _jobTitleID = response.data.data.job_title_id;

                    employeeService.getJobtitle(_jobTitleID).then(function(response) {
                        _this.job_title_name = response.data.data.name;
                    });
                });
            }
        });
    }]);
});