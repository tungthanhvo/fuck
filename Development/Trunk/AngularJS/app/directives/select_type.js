define(['./module', 'jquery'], function(directives) {
	'use strict';
	directives.directive('selectType', function() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				$(element).select2({
					placeholder: 'All',
                    theme: 'bootstrap',
                    minimumResultsForSearch: -1,
                    dropdownCssClass : 'small-drop' 
				});
			}
		}
	});
});