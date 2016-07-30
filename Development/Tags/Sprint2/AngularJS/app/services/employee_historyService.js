/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory("employee_historyService", ['$http', function($http) {
        var employee_history_service = {};
        var api_server = config.api_server;
        ///api/entries/:id
        //return $resource('/api/employees/:user_id/employeehistories/:edu_id/?role=admin');
        employee_history_service.retrieveAllByUser_Id = function(user_id) {
            var url = api_server + '/api/employees/' + user_id + '/employeehistories';
            var config;
            return $http.get(url);
        }
        employee_history_service.create = function(creating_employee_history) {
            var url = api_server + '/api/employees/' + creating_employee_history.user_id + '/employeehistories';
            return $http.post(url, JSON.stringify(creating_employee_history));
        }
        employee_history_service.update = function(updating_employee_history) {
            var url = api_server + '/api/employees/' + updating_employee_history.user_id + '/employeehistories/' + updating_employee_history.id;
            return $http.put(url, JSON.stringify(updating_employee_history));
        }
        employee_history_service.delete = function(deleting_employee_history) {
            var url = api_server + '/api/employees/' + deleting_employee_history.user_id + '/employeehistories/' + deleting_employee_history.id;
            return $http.delete(url);
        }
        return employee_history_service;
    }]);
});