/**
 * Created by tungvot on 6/26/2016.
 */
define(['./module', 'config'], function (services, config) {
    'use strict';
    services.factory("employeeService", function ($http, $log, $httpParamSerializerJQLike) {

        /**
         * get all departments
         * @returns {*}
         */
        var getDepartments = function () {
            return $http({
                method: 'GET',
                url: config.api_server + '/api/data/departments'
            });
        };

        /**
         * get all job-titles by department & competence
         * @returns {*}
         */
        var getJobTitles = function (competenceID) {
            return $http({
                method: 'GET',
                url: config.api_server + '/api/data/job-titles/' + competenceID
            });
        };

        /**
         * get all competences by departmentCode
         * @param departmentCode
         * @returns {*}
         */
        var getCompetences = function (departmentCode) {
            return $http({
                method: 'GET',
                url: config.api_server + '/api/data/competences/' + departmentCode
            });
        };

        /**
         * get all line managers
         * @returns {*}
         */
        var getLineManagers = function () {
            return $http({
                method: 'GET',
                url: config.api_server + '/api/data/line-managers'
            });
        };

        var getCountries = function () {
            return $http({
                method: 'GET',
                url: 'data/country.json'
            });
        };

        var getNationalities = function () {
            return $http({
                method: 'GET',
                url: 'data/nationality.json'
            });
        };

        var getUserInfo = function (userID) {
            return $http({
                method: 'GET',
                url: config.api_server + '/api/data/users/' + userID
            });
        };

        var getTechnicalSkillForUser = function (userID) {
            return $http({
                method: 'GET',
                url: config.api_server + '/api/data/technical-skills/' + userID
            });
        };

        var updateTechnicalSkillForUuser = function (user_id, techSkillsInfo) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/users/update-technical-skills/' + user_id,
                method: "POST",
                data: $httpParamSerializerJQLike({
                    'os': techSkillsInfo.OS,
                    'languages': techSkillsInfo.LANGUAGES,
                    'databases': techSkillsInfo.DATABASES,
                    'commsAndNetworks': techSkillsInfo.COMMSANDNETWORKS,
                    'packages': techSkillsInfo.PACKAGES,
                    'methodologies': techSkillsInfo.METHODOLOGIES
                })
            });
        };

        var updatePersonalInfoForUser = function (user_id, userInfo) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/users/update-personal-information/' + user_id,
                method: "POST",
                data: $httpParamSerializerJQLike({
                    'first_name': userInfo.first_name,
                    'last_name': userInfo.last_name,
                    'nickname': userInfo.nickname,
                    'married_status': userInfo.married_status,
                    'gender': userInfo.gender,
                    'dob': userInfo.dob,
                    'country_code': userInfo.country_code,
                    'nationality_code': userInfo.nationality_code,
                    'address': userInfo.address,
                    'mobile': userInfo.mobile,
                    'personal_email': userInfo.personal_email
                })
            });
        };

        var updateCompanyInformationForUser = function (user_id, comInfo) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/users/update-company-information/' + user_id,
                method: "POST",
                data: $httpParamSerializerJQLike({
                    'company_join_date': comInfo.company_join_date,
                    'job_title_id': comInfo.job_title_id,
                    'line_manager_id': comInfo.line_manager_id,
                    'company_email': comInfo.company_email + comInfo.suffix_company_email,
                    'competence_id': comInfo.competence_id,
                    'department_id': comInfo.department_id,
                    'level': comInfo.level,
                    'skype_id': comInfo.skype_id
                })
            });
        };

        var getDepartment = function (id) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/data/department/' + id,
                method: "GET",
                data: $httpParamSerializerJQLike({
                    'id': id
                })
            });
        };

        var getCompetence = function (id) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/data/competence/' + id,
                method: "GET",
                data: $httpParamSerializerJQLike({
                    'id': id
                })
            });
        };

        var getJobTitle = function (id) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/data/job-title/' + id,
                method: "GET",
                data: $httpParamSerializerJQLike({
                    'id': id
                })
            });
        };

        var getInfo = function (id) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/data/info/' + id,
                method: "GET",
                data: $httpParamSerializerJQLike({
                    'id': id
                })
            });
        };

        var checkCompanyEmailExist = function (email) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/data/check-company-email/' + email,
                method: "GET",
                data: $httpParamSerializerJQLike({
                    'email': email
                })
            });
        };

        return {
            getDepartment: getDepartments,
            getCountries: getCountries,
            getNationalities: getNationalities,
            getLineManagers: getLineManagers,
            getCompetences: getCompetences,
            getJobTitles: getJobTitles,
            getUserInfo: getUserInfo,
            getTechnicalSkillForUser: getTechnicalSkillForUser,
            updateTechnicalSkillForUser: updateTechnicalSkillForUuser,
            updatePersonalInformationForUser: updatePersonalInfoForUser,
            updateCompanyInformationForUser: updateCompanyInformationForUser,
            getDepartmentByID: getDepartment,
            getCompetence: getCompetence,
            getJobtitle: getJobTitle,
            getInfo: getInfo,
            checkCompanyEmailExist: checkCompanyEmailExist
        }

    });
});