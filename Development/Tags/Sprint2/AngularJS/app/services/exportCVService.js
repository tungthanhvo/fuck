define(['./module', 'config'], function(services, config) {
    'use strict'
    services.factory('exportCVService', ['$http', '$cookieStore', '$location', 'jwtHelper', '$rootScope', '$httpParamSerializerJQLike', function($http, $cookieStore, $location, jwtHelper, $rootScope, $httpParamSerializerJQLike) {
        var exportCV_service = {}
        exportCV_service.exportWord = function(id) {
            return $http({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                url: config.api_server + '/api/cv/export/' + id + '/word',
                method: 'POST',
                data: $httpParamSerializerJQLike({
                    'id': id
                })
            })
        }
        return exportCV_service
    }])
})