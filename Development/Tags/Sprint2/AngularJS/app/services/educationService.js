/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory("educationService", ['$http', function($http) {
        var education_service = {};
        var api_server = config.api_server;
        ///api/entries/:id
        //return $resource('http://localhost:8080/api/employees/:user_id/educations/:edu_id/?role=admin');
        education_service.retrieveAllByUser_Id = function(user_id) {
            var url = api_server + '/api/employees/' + user_id + '/educations';
            var config;
            return $http.get(url);
        }
        education_service.create = function(creating_education) {
            var url = api_server + '/api/employees/' + creating_education.user_id + '/educations';
            return $http.post(url, JSON.stringify(creating_education));
        }
        education_service.update = function(updating_education) {
            var url = api_server + '/api/employees/' + updating_education.user_id + '/educations/' + updating_education.id;
            return $http.put(url, JSON.stringify(updating_education));
        }
        education_service.delete = function(deleting_education) {
            var url = api_server + '/api/employees/' + deleting_education.user_id + '/educations/' + deleting_education.id;
            return $http.delete(url);
        }
        return education_service;
    }]);
});