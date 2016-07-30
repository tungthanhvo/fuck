/**
 * Created by tungvot on 6/26/2016.
 */
define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory("projectMemberService", function($http, $log, $httpParamSerializerJQLike) {
        var getMember = function(project_id) {
            var url = config.api_server + '/apii/projects/' + project_id + '/getAvailableMembers';
            return $http.get(url);
        };
        var getRoleTitle = function(project_id) {
            var url = config.api_server + '/apii/projects/' + project_id + '/getAvailableRoles';
            return $http.get(url);
        };

        var addProjectMember = function(project_id, data){
            var url = config.api_server + '/apii/projects/' + project_id + '/members';
            return $http.post(url, data);
        };

        var getAllMemberInProject = function(project_id){
            var url = config.api_server + '/apii/projects/' + project_id + '/members';
            return $http.get(url);
        };

        var updateMemberInProject = function(id, data){
            var url = config.api_server + '/apii/projects/' + id + '/members';
            return $http.put(url,data);
        }

         var deleteMemberInProject = function(id, data){
            var url = config.api_server + '/apii/projects/' + id + '/members';
            return $http.delete(url,{params: {id: data}});
        }

        return {
            getMember: getMember,
            getRoleTitle: getRoleTitle,
            addProjectMember: addProjectMember,
            getAllMemberInProject: getAllMemberInProject,
            updateMemberInProject: updateMemberInProject,
            deleteMemberInProject: deleteMemberInProject
        };
    });
});