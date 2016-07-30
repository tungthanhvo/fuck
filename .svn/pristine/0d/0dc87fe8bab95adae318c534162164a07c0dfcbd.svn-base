define(['./module', 'config'], function (module, config) {
	module.factory('searchService', ['$http', function(http) {
		var searchEmployee = function(data) {
			return http({
                url: config.api_server + '/api/search_employee',
                params: data,
                method: 'GET'
            })
		}

		var searchProject = function(data) {
			return http({
				url: config.api_server + '/api/search_project',
				params: data,
				method: 'GET'
			});
		}

		return {
			searchEmployee: searchEmployee,
			searchProject: searchProject
		}
	}])
});