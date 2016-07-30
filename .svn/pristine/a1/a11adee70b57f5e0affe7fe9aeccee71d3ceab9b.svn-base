define(['./module', 'jquery', 'select2'], function(directives) {
	'use strict';
	directives.directive('selectSkill', function() {
		return {
			restrict: 'A',
			link: function(scope, element) {
				$(element).select2({
					placeholder: 'Select Skill',
                    theme: 'bootstrap'
				});
			}
		}
	});
});