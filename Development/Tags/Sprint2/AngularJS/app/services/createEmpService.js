define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory("createEmpService", ['$http', function($http) {
        var createEmp_service = {};
        var apiServer = config.api_server;

        createEmp_service.getLineManager = function() {
            var url = apiServer + '/api/misc/employees/linemanagers';
            return $http.get(url);
        }
        createEmp_service.getDepartments = function() {
            var url = apiServer + '/api/misc/employees/departments';
            return $http.get(url);
        }
        createEmp_service.getCompetence = function(dept_id) {
            var url = apiServer + '/api/misc/departments/' + dept_id + '/competence';
            return $http.get(url);
        }
        createEmp_service.getJobTitle = function(comp_id) {
            var url = apiServer + '/api/misc/competence/' + comp_id + '/job_title';
            return $http.get(url);
        }
        createEmp_service.countEmp = function() {
            var url = apiServer + '/api/misc/employees/count';
            return $http.get(url);
        }
        createEmp_service.checkListUsername = function(username) {
            var url = apiServer + '/api/misc/employees/check/' + username;
            return $http.get(url);
        }
        createEmp_service.checkExistEmail = function(companyEmail, mailExtension) {
            var url = apiServer + '/api/misc/employees/checkEmail/' + companyEmail + mailExtension;
            return $http.get(url);
        }
        return createEmp_service;
    }]);
});