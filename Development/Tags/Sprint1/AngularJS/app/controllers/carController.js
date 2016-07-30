define(['./module', 'ui-bootstrap'], function(controllers) {
    'use strict';
    controllers.controller("carController", ['$scope', 'carService', function($scope, carService) {

        var self = this;
        carService.getListCar();

        var deleteCar = function() {
            carService.deleteCar();
        };

        self.deleteCar = deleteCar;

    }]);
})