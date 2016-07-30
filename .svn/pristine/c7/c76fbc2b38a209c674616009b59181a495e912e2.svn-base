define(['./module'], function (controllers) {
    'use strict';
    controllers.controller('companyInformationController', ['$scope', '$http', '$log', '$routeParams', '$uibModal', 'employeeService', function ($scope, $http, $log, $routeParams, $uibModal, employeeService) {

        var _this = this;

        _this.alerts = {
            "update": {
                type: 'success',
                msg: 'Company Information has been updated'
            },
            "error": {
                type: 'danger',
                msg: 'Update company information encounter error'
            }
        };

        function callAlert(alert) {
            _this.alert = alert;
            _this.isshowalert = true;
        }

        _this.closeAlert = function () {
            _this.isshowalert = false;
        }

        _this.user_id = $scope.editEmpCtrl.user_id;

        _this.isCompanyJoinDateValid = true;

        _this.isSuccess = false;

        function parseDate(date) {
            var res = "";
            var currentdate = new Date(date);
            var digitalmonth = ((currentdate.getMonth() + 1) >= 10) ? (currentdate.getMonth() + 1) : '0' + (currentdate.getMonth() + 1);
            var digitaldate = ((currentdate.getDate()) >= 10) ? (currentdate.getDate()) : '0' + (currentdate.getDate());
            res = currentdate.getFullYear() + "/" + digitalmonth + "/" + digitaldate;
            return new Date(res);
        }

        _this.companyInfoSubmit = function () {
            if (_this.company_join_date == null) {
                _this.isCompanyJoinDateValid = true;
                return;
            }

            var _competence = $scope.editEmpCtrl.competence;
            var _department = $scope.editEmpCtrl.department;

            employeeService.updateCompanyInformationForUser(_this.user_id, _this.company_join_date, _this.jobTitle,
                _this.lineManager, _this.email, _competence, _department).then(function (response) {
                if (response.data.code == '404') {
                    callAlert(_this.alerts["error"]);
                } else if (response.data.code == '200') {
                    callAlert(_this.alerts["update"]);
                }
            });
        };

        employeeService.getUserInfo(_this.user_id).then(function (response) {
            _this.userInfo = response.data;

            _this.company_join_date = parseDate(_this.userInfo.company_join_date);
        });

    }]);
});