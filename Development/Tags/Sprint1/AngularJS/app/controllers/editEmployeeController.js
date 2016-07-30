define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('editEmployeeController', ['$scope', '$location', '$http', '$log', '$routeParams', 'employeeService', function ($scope, $location, $http, $log, $routeParams, employeeService) {
        // skeleton
        var _this = this;

        _this.user_id = $routeParams.user_id;

        // switch mode
        _this.isViewMode = true;

        _this.isShortcutViewMode = true;
        _this.isShortcutEditMode = false;

        _this.isShortcutViewMode = true;
        _this.isShortcutEditMode = false;

        _this.btnViewOrEditMode = "Edit";

        _this.switchMode = function () {

            _this.isViewMode = !_this.isViewMode;
            _this.isShortcutViewMode = !_this.isShortcutViewMode;
            _this.isShortcutEditMode = !_this.isShortcutEditMode;

            if (_this.isViewMode) {
                _this.btnViewOrEditMode = "Edit";
            } else {
                _this.btnViewOrEditMode = "View";
                // $location.path('/home/' + _this.user_id);
            }
        };


        employeeService.getCountries().then(function (response) {
            _this.countries = response.data;
        });

        employeeService.getNationalities().then(function (response) {
            _this.nationality = response.data;
        });

        employeeService.getDepartment().then(function (response) {
            _this.departments = response.data;
        });

        _this.departmentChange = function () {

            if (_this.department != null && _this.department != undefined) {

                employeeService.getCompetences(_this.department).then(function (response) {
                    _this.competences = response.data;
                });

            }
        };

        _this.competenceChange = function () {
            if (_this.competence != null && _this.competence != undefined) {

                employeeService.getJobTitles(_this.competence).then(function (response) {
                    _this.job_titles = response.data;
                });
            }
        };

        employeeService.getLineManagers().then(function (response) {
            _this.lineManagers = response.data;
        });

        employeeService.getUserInfo(_this.user_id).then(function (response) {
            _this.userInfo = response.data;

            employeeService.getUserInfo(_this.userInfo.line_manager_id).then(function (response) {
                _this.line_manager_name = response.data.first_name + ' ' + response.data.last_name;
            });

            employeeService.getInfo(_this.userInfo.competence_job_title_id).then(function (response) {
                var _competenceID = response.data.competence_id;
                var _jobTitleID = response.data.job_title_id;

                employeeService.getCompetence(_competenceID).then(function (response) {
                    _this.competence_name = response.data.name;

                    var _departmentID = response.data.department_id;

                    employeeService.getDepartmentByID(_departmentID).then(function (response) {
                        _this.department_name = response.data.name;
                    });
                });

                employeeService.getJobtitle(_jobTitleID).then(function (response) {
                    _this.job_title_name = response.data.name;
                });

            });

        });

        // _this.isEmptyTechnicalSkills = false;
        //
        // employeeService.getTechnicalSkillForUser(_this.user_id).then(function (response) {
        //     _this.technicalSkills = response.data;
        //
        //     if(_this.technicalSkills.length == 0){
        //         _this.isEmptyTechnicalSkills = true;
        //     }
        //
        // });
    }]);
});