/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./module', 'config'], function (services, config) {
    'use strict';
    services.factory("assignmentService", ['$http', '$httpParamSerializerJQLike', '$log', function ($http, $httpParamSerializerJQLike, $log) {
        var assignment_service = {};
        var api_server = config.api_server;

        assignment_service.retrieveRecentAssignmentAllByUser_Id = function (user_id) {
            var url = api_server + '/api/employees/' + user_id + '/recent_assignments';
            var config;
            return $http.get(url);
        };
        assignment_service.updateRecentAssignment = function (user_id, project) {
            var url = api_server + '/api/employees/' + user_id + '/recent_assignments/' + project.id;
            var config;
            return $http.put(url, JSON.stringify(project));
        };

        /**
         * Working History
         */
        assignment_service.getAllWorkingHistories = function (user_id) {
            var url = api_server + '/apii/assignments/histories/' + user_id;
            return $http.get(url);
        };

        assignment_service.getWorkingHistory = function (history_id) {
            var url = api_server + '/apii/assignments/history/' + history_id;
            return $http.get(url);
        };

        assignment_service.addWorkingHistory = function (user_id, workingHistory) {
            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/apii/assignments/history/' + user_id,
                method: "POST",
                data: $httpParamSerializerJQLike({
                    project_name: workingHistory.project_name,
                    project_from: workingHistory.project_from,
                    project_to: workingHistory.project_to,
                    project_size: workingHistory.project_size,
                    project_role: workingHistory.project_role,
                    project_description: workingHistory.project_description,
                    project_responsibility: workingHistory.project_responsibility,
                    project_technology: workingHistory.project_technology,
                    user_id: user_id
                })
            });
        };

        assignment_service.updateWorkingHistory = function (history_id, workingHistory) {

            var temp_start_date = "default";
            var temp_end_date = "default";

            if (workingHistory.start_date != null) {
                temp_start_date = workingHistory.start_date;
            }

            if (workingHistory.end_date != null) {
                temp_end_date = workingHistory.end_date;
            }

            $log.debug('.............');
            $log.debug(temp_start_date);
            $log.debug(temp_end_date);


            return $http({
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                url: config.api_server + '/apii/assignments/update-history/' + history_id,
                method: "POST",
                data: $httpParamSerializerJQLike({
                    name: workingHistory.name,
                    start_date: temp_start_date,
                    end_date: temp_end_date,
                    size: workingHistory.size,
                    role_title: workingHistory.role_title,
                    description: workingHistory.description,
                    my_responsibility: workingHistory.my_responsibility,
                    technology: workingHistory.technology
                })
            });
        };

        assignment_service.deleteHistories = function (array_delete) {

            return $http({
                headers: {'Content-Type': 'application/json'},
                url: config.api_server + '/apii/assignments/delete-histories',
                method: "POST",
                data: {data: array_delete}
            });
        };

        assignment_service.includeWorkingHistory = function (history_id, is_included) {
            return $http({
                headers: {'Content-Type': 'application/json'},
                url: config.api_server + '/apii/assignments/included-history/' + history_id,
                method: "POST",
                data: {is_included: is_included}
            });
        }

        // return assignment service
        return assignment_service;
    }]);
});