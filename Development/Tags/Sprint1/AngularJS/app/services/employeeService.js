/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./module', 'config'], function (services, config) {
    'use strict';
    services.factory("employeeService", function ($http, $log, $httpParamSerializerJQLike) {
        var self = this;

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

        var updateTechnicalSkillForUuser = function (userID, os, languages, databases, commsAndNetworks, packages, methodologies) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/users/technical-skills/' + userID,
                method: "POST",
                data: $httpParamSerializerJQLike({
                    'os': os,
                    'languages': languages,
                    'databases': databases,
                    'commsAndNetworks': commsAndNetworks,
                    'packages': packages,
                    'methodologies': methodologies
                })
            });
        };

        var updatePersonalInfoForUuser = function (userID, firstName, lastName, nickname, status, gender, dob, countryCode, nationalityCode, address, mobile, personalEMail) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/users/personal-information/' + userID,
                method: "POST",
                data: $httpParamSerializerJQLike({
                    'firstName': firstName,
                    'lastName': lastName,
                    'nickname': nickname,
                    'status': status,
                    'gender': gender,
                    'dob': dob,
                    'countryCode': countryCode,
                    'nationalityCode': nationalityCode,
                    'address': address,
                    'mobile': mobile,
                    'personalEmail': personalEMail
                })
            });
        };

        var updateCompanyInformationForUser = function (userID, company_join_date, jobTitle, lineManager, email, competence, department) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/api/users/company-information/' + userID,
                method: "POST",
                data: $httpParamSerializerJQLike({
                    'company_join_date': company_join_date,
                    'jobTitle': jobTitle,
                    'lineManager': lineManager,
                    'email': email,
                    'competence': competence,
                    'department': department
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
            updatePersonalInformationForUser: updatePersonalInfoForUuser,
            updateCompanyInformationForUser: updateCompanyInformationForUser,
            getDepartmentByID: getDepartment,
            getCompetence: getCompetence,
            getJobtitle : getJobTitle,
            getInfo: getInfo
        }

    });
});