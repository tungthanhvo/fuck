/**
 * Created by minhtran1 on 6/22/2016.
 */
define(['./module', 'config'], function(services, config) {
    'use strict';
    services.factory("carService", ['$http',
        function($http) {
            var api_server = config.api_server;
            var cars = [{
                "name": "Car 1",
                "quantity": 5
            }, {
                "name": "Car 2",
                "quantity": 2
            }, {
                "name": "Car 3",
                "quantity": 7
            }, {
                "name": "Car 4",
                "quantity": 9
            }, {
                "name": "Car 5",
                "quantity": 1
            }];

            var getListCar = function() {};

            var deleteCar = function() {
                $http.delete(
                    api_server + '/api/employees/1'
                );
            }

            var getDetailByOrdering = function(ordering) {
                return cars[ordering];
            }

            return {
                getListCar: getListCar,
                getDetailByOrdering: getDetailByOrdering,
                deleteCar: deleteCar
            };
        }
    ]);
});