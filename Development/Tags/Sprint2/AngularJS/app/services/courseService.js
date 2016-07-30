/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory("courseService", ['$http', function($http) {
        var course_service = {};
        var api_server = config.api_server;
        ///api/entries/:id
        //return $resource('http://localhost:8080/api/employees/:user_id/courses/:edu_id/?role=admin');
        course_service.retrieveAllByUser_Id = function(user_id) {
            var url = api_server + '/api/employees/' + user_id + '/courses';
            var config;
            return $http.get(url);
        }
        course_service.create = function(creating_course) {
            var url = api_server + '/api/employees/' + creating_course.user_id + '/courses';
            return $http.post(url, JSON.stringify(creating_course));
        }
        course_service.update = function(updating_course) {
            var url = api_server + '/api/employees/' + updating_course.user_id + '/courses/' + updating_course.id;
            return $http.put(url, JSON.stringify(updating_course));
        }
        course_service.delete = function(deleting_course) {
            var url = api_server + '/api/employees/' + deleting_course.user_id + '/courses/' + deleting_course.id;
            return $http.delete(url);
        }
        return course_service;
    }]);
});