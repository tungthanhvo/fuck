/**
 * Created by tungvot on 6/26/2016.
 */
define(['./module', 'config'], function (services, config) {
    'use strict';
    services.factory("projectService", function ($http, $log, $httpParamSerializerJQLike) {
        var self = this;

        var checkProjectName = function (projectName) {
            var url = config.api_server + '/apii/projects/checkproject/' + projectName;
            return $http.get(url);
        }

        var getProjectManager = function () {
            var url = config.api_server + '/api/misc/employees/pm';
            return $http.get(url);
        }
        var getSeniorManager = function () {
            var url = config.api_server + '/api/misc/employees/sm';
            return $http.get(url);
        }

        var getProjectInfo = function (project_id) {
            return $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: config.api_server + '/apii/projects/' + project_id,
                method: "GET",
            });
        };

        var updateProjectInfo = function (project_info) {
            var url = config.api_server + '/apii/projects/' + project_info.id;
            return $http.put(url, JSON.stringify(project_info));
        }
        var deleteProjectInfo = function (project_info) {
            var url = config.api_server + '/apii/projects/' + project_info.id;
            return $http.delete(url);
        }

        var getClientIndustry = function (id) {
            var url = config.api_server + '/apii/projects/client-industry/' + id;
            return $http.get(url);
        }

        var getProjectLocation = function (id) {
            var url = config.api_server + '/apii/projects/project-location/' + id;
            return $http.get(url);
        }

        var getProjectType = function (id) {
            var url = config.api_server + '/apii/projects/project-type/' + id;
            return $http.get(url);
        }

        var getProjectStatus = function (id) {
            var url = config.api_server + '/apii/projects/project-status/' + id;
            return $http.get(url);
        }


        return {
            getProjectInfo: getProjectInfo,
            getProjectManager: getProjectManager,
            getSeniorManager: getSeniorManager,
            checkProjectName: checkProjectName,
            updateProjectInfo: updateProjectInfo,
            deleteProjectInfo: deleteProjectInfo,
            getClientIndustry: getClientIndustry,
            getProjectLocation: getProjectLocation,
            getProjectType: getProjectType,
            getProjectStatus: getProjectStatus
        }
    });
});