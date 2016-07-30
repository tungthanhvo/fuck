define(['./module', 'config'], function(module, config) {
    module.factory('metadataService', ['$http', function(http) {
        var getMetadata = function() {
            return http({
                url: config.api_server + '/metadata/',
                method: 'GET',
            });
        };

        return {
            getMetadata: getMetadata
        }
    }]);
});