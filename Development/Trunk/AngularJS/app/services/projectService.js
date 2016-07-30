/**
 * Created by tungvot on 6/26/2016.
 */
define(['./module', 'config'], function (services, config) {
    'use strict';
    services.factory("projectService", function ($http, $log, $httpParamSerializerJQLike) {
        var currentRole = {};
        var setCurrentRole = function (curRole) {
            currentRole = curRole;
        };
        var getCurrentRole = function () {
            return currentRole;
        };
        var createRoleInProject = function (role) {
            var url = config.api_server + '/apii/projects/' + role.projectId + '/role';
            return $http.post(url, JSON.stringify(role));
        };
        var updateRoleInProject = function (role) {
            var url = config.api_server + '/apii/projects/' + role.projectId + '/role/' + role.roleId;
            return $http.put(url, JSON.stringify(role));
        };
        var deleteRoleInProject = function (role) {
            var url = config.api_server + '/apii/projects/' + role.projectId + '/role?role_id=' + role.roleId;
            return $http.delete(url);
        };
        var checkProjectName = function (projectName) {
            var url = config.api_server + '/apii/projects/checkproject/' + projectName;
            return $http.get(url);
        };
        var checkProjectRoleId = function (projectId, roleId) {
            var url = config.api_server + '/apii/projects/' + projectId + '/checkProjectRole/role/' + roleId;
            return $http.get(url);
        };

        var getProjectManager = function (projectID) {
            var url = config.api_server + '/apii/projects/' + projectID + '/getrolepm';
            return $http.get(url);
        };
        var getSeniorManager = function (projectID) {
            var url = config.api_server + '/apii/projects/' + projectID + '/getrolesm';
            return $http.get(url);
        };

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
        };
        var deleteProjectInfo = function (project_info) {
            var url = config.api_server + '/apii/projects/' + project_info.id;
            return $http.delete(url);
        };

        var getClientIndustry = function (id) {
            var url = config.api_server + '/apii/projects/client-industry/' + id;
            return $http.get(url);
        };

        var getProjectLocation = function (id) {
            var url = config.api_server + '/apii/projects/project-location/' + id;
            return $http.get(url);
        };

        var getProjectType = function (id) {
            var url = config.api_server + '/apii/projects/project-type/' + id;
            return $http.get(url);
        };

        var getProjectStatus = function (id) {
            var url = config.api_server + '/apii/projects/project-status/' + id;
            return $http.get(url);
        };

        var getProjectRoles = function (id) {
            var url = config.api_server + '/apii/projects/' + id + '/roles';
            return $http.get(url);
        }

        var getProjectMembers = function (id) {
            var url = config.api_server + '/apii/projects/' + id + '/membersinproject';
            return $http.get(url);
        }

        var getMinMaxDateOfMembers = function (project_id) {
            var url = config.api_server + '/apii/projects/' + project_id + '/members/';
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
            getProjectStatus: getProjectStatus,
            getCurrentRole: getCurrentRole,
            setCurrentRole: setCurrentRole,
            createRoleInProject: createRoleInProject,
            updateRoleInProject: updateRoleInProject,
            checkProjectRoleId: checkProjectRoleId,
            deleteRoleInProject: deleteRoleInProject,
            getProjectRoles: getProjectRoles,
            getProjectMembers: getProjectMembers,
            getMinMaxDateOfMembers: getMinMaxDateOfMembers
        };
    });
});