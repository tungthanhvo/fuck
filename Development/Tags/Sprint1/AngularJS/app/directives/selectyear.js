define(['./module'], function(directives) {
    'use strict';
    directives.directive('selectYear', function() {
        return {
            restrict: 'E',
            scope: {
                fromyear: "=fromyear",
                toyear: "=toyear"
            },
            transclude: true,
            template: '<div class="form-group col-lg-6">' +
                '<label class="required text-left ">From Year</label>' +
                '<select name="fromyear" ng-options="item for item in years" ng-model="fromyear" class="form-control" ng-change="chooseFromYear()" required></select>' +
                '<span class="error" ng-show="!isNumberYear_FromYear">This field is required.</span>' +
                '</div>' +
                '<div class="form-group col-lg-6">' +
                '<label class="required text-left ">To Year</label>' +
                '<select name="toyear" ng-options="item for item in years" ng-model="toyear" class="form-control" ng-change="chooseToYear()" required></select>' +
                '<span class="error" ng-show="!isNumberYear_ToYear">This field is required.</span>' +
                '<span class="error " ng-show="isToYear ">From Year must not be greater than To Year.</span>' +
                '</div>',
            controller: function($scope, $element, $attrs) {
                $scope.years = ["YYYY"];
                $scope.isNumberYear_FromYear = true; //angular.isNumber($scope.year);
                $scope.isNumberYear_ToYear = true;
                $scope.isToYear = false;

                function getYears(startyear) {
                    var currentyear = (new Date()).getFullYear();
                    for (var i_currentyear = currentyear; i_currentyear >= startyear; i_currentyear--) {
                        $scope.years.push(i_currentyear);
                    }
                };

                getYears(1950);

                $scope.chooseFromYear = function() {
                    $scope.isNumberYear_FromYear = angular.isNumber($scope.fromyear);
                    if (angular.isNumber($scope.fromyear) &&
                        angular.isNumber($scope.toyear) &&
                        $scope.fromyear >= $scope.toyear) {
                        $scope.isToYear = true;
                    } else {
                        $scope.isToYear = false;
                    }
                };

                $scope.chooseToYear = function() {
                    $scope.isNumberYear_ToYear = angular.isNumber($scope.toyear);
                    if (angular.isNumber($scope.fromyear) &&
                        angular.isNumber($scope.toyear) &&
                        $scope.fromyear >= $scope.toyear) {
                        $scope.isToYear = true;
                    } else {
                        $scope.isToYear = false;
                    }
                }
            }
        }
    });

});