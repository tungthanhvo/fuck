define(['./module', 'jquery', 'select2'], function(directives) {
	'use strict';
	directives.directive('selectSearch', function() {
		return {
			restrict: 'A',
			link: function(scope, element) {				
				$(element).select2({
					placeholder: 'All',
                    theme: 'bootstrap',
                    dropdownCssClass : 'big-drop',
                    allowClear: 'true'
				});
			}
		}
	});
});