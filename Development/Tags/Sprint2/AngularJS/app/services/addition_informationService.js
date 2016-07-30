/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory("addition_informationService", ['$http', function($http) {
        var addition_information_service = {};
        var api_server = config.api_server;
        ///api/entries/:id
        //return $resource('/api/employees/:user_id/additioninformation/:edu_id/?role=admin');
        addition_information_service.retrieveAdditionInformationByUser_Id = function(user_id) {
            var url = api_server + '/api/employees/' + user_id + '/additioninformation';
            var config;
            return $http.get(url);
        }
        addition_information_service.update = function(updating_addition_information) {
            var url = api_server + '/api/employees/' + updating_addition_information.id + '/additioninformation';
            return $http.put(url, JSON.stringify(updating_addition_information));
        }
        return addition_information_service;
    }]);
});