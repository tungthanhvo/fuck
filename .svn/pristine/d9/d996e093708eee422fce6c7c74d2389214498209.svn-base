define(['./module'], function(services) {
	'use strict';
	services.factory('stringService', function() {
		var splitName = function(text) {
			var result = {};
			var array = text.replace(/\s+/g, " ").split(' ');
			result.first_name = array[0];
			result.last_name = array.slice(1, array.length).join(' ');
			return result;
		};

		return {
			splitName: splitName
		}
	});
});