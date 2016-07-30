define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('employeeProfileController', ['$scope', '$http', 'employeeService', function ($scope, $http, employeeService) {
        var _this = this;
        // TODO
    }]);
});


// define(['./module'], function(controllers) {
//     'use strict';
//     controllers.controller('employeeProfileController', ['$scope', '$http', function($scope, $http) {
//         var _this = this;
//
//         // personal information
//
//         _this.isViewMode = true;
//         _this.isShortcutViewMode = true;
//         _this.isShortcutEditMode = false;
//         _this.isMarialSelected = true;
//         _this.isValidDOB = true;
//
//         _this.isCountrySelected = true;
//         _this.isNationalitySelected = true;
//
//
//         _this.btnViewOrEditMode = "Edit";
//
//         _this.dob = new Date(1993, 6, 16);
//
//         _this.switchMode = function() {
//
//             _this.isViewMode = !_this.isViewMode;
//             _this.isShortcutViewMode = !_this.isShortcutViewMode;
//             _this.isShortcutEditMode = !_this.isShortcutEditMode;
//
//             if (_this.isViewMode) {
//                 _this.btnViewOrEditMode = "Edit";
//             } else {
//                 _this.btnViewOrEditMode = "View";
//             }
//
//         };
//
//         _this.personalInfoSubmit = function() {
//             if (_this.status == -1) {
//                 _this.isMarialSelected = false;
//                 return;
//             }
//
//             if (_this.dob == null) {
//                 _this.isValidDOB = false;
//                 return;
//             }
//
//             if (_this.country == undefined || _this.nationality == undefined) {
//                 _this.isCountrySelected = false;
//                 _this.isNationalitySelected = false;
//                 return;
//             }
//
//             // var text = _this.firstName + ', ' + _this.lastName + ',' + _this.nickName + ',' + _this.dob +','
//             //+ _this.address + ',' + _this.country + ',' + _this.nationality;
//
//             //var d = new Date(_this.dob);
//
//             //  alert(d.getDate() + ',' + d.getMonth()+',' + d.getFullYear());
//
//             // alert(_this.country);
//
//         };
//
//         _this.statusChange = function() {
//             if (_this.status == -1) {
//                 _this.isMarialSelected = false;
//             } else {
//                 _this.isMarialSelected = true;
//             }
//         };
//
//         _this.nationalityChange = function() {
//             if (_this.nationality != undefined) {
//                 _this.isNationalitySelected = true;
//             }
//         };
//
//         _this.countryChange = function() {
//             if (_this.country != undefined) {
//                 _this.isCountrySelected = true;
//             }
//         };
//
//         _this.countries = [];
//
//         $http({
//             method: 'GET',
//             url: 'data/country.json'
//         }).success(function(data, status) {
//             _this.countries = data;
//         }).error(function(data, status) {
//             alert("Error");
//         });
//
//
//         // company information
//
//         _this.isCompanyJoinDateValid = true;
//
//         _this.company_join_date = new Date();
//
//         _this.companyInfoSubmit = function() {
//             if (_this.company_join_date == null) {
//                 _this.isCompanyJoinDateValid = true;
//                 return;
//             }
//         };
//     }]);
// });