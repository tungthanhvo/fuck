define(['./module'], function(directives) {
    'use strict';
    directives.directive('imageModel', ['$parse', function($parse) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var model = $parse(attrs.imageModel);
                var modelSetter = model.assign;
                element.bind('change', function() {
                    scope.$apply(function() {
                        modelSetter(scope, element[0].files[0]);
                        scope.validateImage();
                        //alert(scope.user.avatar);
                    });
                });
            }
        };
    }]);

});