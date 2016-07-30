/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory("skillmetricsService", ['$http', function($http) {
        var skill_metric_service = {};
        var api_server = config.api_server;
        skill_metric_service.retrieveAllByUser_Id = function(user_id) {
            var url = api_server + '/api/employees/' + user_id + '/skillmetrics';
            var config;
            return $http.get(url);
        }
        skill_metric_service.createandupdate = function(user_id, creating_skillmetric) {
            var url = api_server + '/api/employees/' + user_id + '/skillmetrics';
            return $http.post(url, JSON.stringify(creating_skillmetric));
        }

        skill_metric_service.delete = function(deleting_skillmetric) {
            var url = api_server + '/api/employees/' + deleting_skillmetric.user_id + '/skillmetrics/' + deleting_skillmetric.id;
            return $http.delete(url);
        }
        skill_metric_service.getDOB = function(user_id) {
            var url = api_server + '/api/employees/' + user_id + '/getdob';
            var config;
            return $http.get(url);
        }
        return skill_metric_service;
    }]);
});