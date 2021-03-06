define(['./module', 'config'], function (controllers, config) {
    'use strict';
    var apiServer = config.api_server;
    controllers.controller("ModalProjectEditMemberInstanceCtrl", ['$scope', '$http', '$uibModalInstance', 'toastr', '$log', 'projectMemberService', '$location', 'member', 'startdate',
        function ($scope, $http, $uibModalInstance, toastr, $log, projectMemberService, $location, member, startdate) {
            var self = this;

            var url = $location.path();
            var project_id = url.split('/')[2];

            self.start_date = startdate.start_date;
            self.end_date = startdate.end_date;

            self.dt = '';
            self.releasedate = '';

            self.member = member;
            //console.log(self.member);

            self.companyJoinDate = member.user.company_join_date;
            //self.checkDate = true;

            self.check2Date = true;
            self.checkJoinDateWithProjectStartDate = true;
            self.checkReleaseDateWithEndDate = true;
            self.checkDate = true;
            self.checkjoinDateWithEndDate = true;
            self.checkJoinDate = function () {
                self.check2Date = true;
                self.checkReleaseDateWithEndDate = true;
                self.checkJoinDateWithProjectStartDate = true;
                self.checkDate = true;
                self.checkjoinDateWithEndDate = true;
                var company_join_date = new Date(self.companyJoinDate);
                //console.log(company_join_date);
                company_join_date.setHours(0, 0, 0, 0);
                //console.log(company_join_date);

                var temp1 = new Date(self.end_date);
                temp1.setHours(0, 0, 0, 0);
                if (temp1.getTime - self.dt.getTime() < 0) {
                    self.checkjoinDateWithEndDate = false;
                    $scope.editMemberProject.$setValidity('joindate', false);
                    return;
                }
                else {
                    self.checkjoinDateWithEndDate = true;
                    $scope.editMemberProject.$setValidity('joindate', true);
                }

                if (self.dt.getTime() - company_join_date.getTime() < 0) {
                    self.checkDate = false;
                    $scope.editMemberProject.$setValidity('joindate', false);
                    return;
                }
                else {
                    self.checkDate = true;
                    $scope.editMemberProject.$setValidity('joindate', true);
                }

                var temp = new Date(self.start_date);
                temp.setHours(0, 0, 0, 0);
                //console.log(startdate.getTime());
                if (self.dt.getTime() - temp < 0) {
                    self.checkJoinDateWithProjectStartDate = false;
                    $scope.editMemberProject.$setValidity('joindate', false);
                    return;
                }
                else {
                    self.checkJoinDateWithProjectStartDate = true;
                    $scope.editMemberProject.$setValidity('joindate', true);
                }

                //self.check2Date = true;
                if (!Boolean(self.releasedate)) {
                    return;
                }
                if (self.releasedate.getTime() - self.dt.getTime() < 0) {
                    self.check2Date = false;
                    $scope.editMemberProject.$setValidity('releasedate', false);
                } else {
                    self.check2Date = true;
                    $scope.editMemberProject.$setValidity('releasedate', true);
                }
                if (self.end_date == null) {
                    return;
                }
                else {
                    var temp = new Date(self.end_date);
                    temp.setHours(0, 0, 0, 0);
                    if (temp.getTime() - self.releasedate.getTime() < 0) {
                        self.checkReleaseDateWithEndDate = false;
                        $scope.editMemberProject.$setValidity('releasedate', false);
                    }
                    else {
                        self.checkReleaseDateWithEndDate = true;
                        $scope.editMemberProject.$setValidity('releasedate', true);
                    }
                }
            }




            //self.releasedate = self.member.release_date;

            // self.checkDate = false;
            // self.companyJoinDate = '';
            // self.checkJoinDate = function () {
            //     self.checkDate = false;
            //     if (self.member.dt == null || self.member.dt == '' || self.member.name == null || self.member.name == '') {
            //         return;
            //     }
            //     for (var i = 0; i < self.fn.length; i++) {
            //         if (self.fn[i].id == self.member.name) {
            //             self.companyJoinDate = new Date(self.fn[i].company_join_date);
            //             self.companyJoinDate.setHours(0, 0, 0, 0);
            //             break;
            //         }
            //     }
            //     console.log(`Company join date: ${self.companyJoinDate}, Project join date: ${self.member.dt}`);
            //     if (self.member.dt.getTime() - self.companyJoinDate.getTime() < 0) {
            //         self.checkDate = true;
            //     }

            // }
            self.save = function () {
                if ($scope.editMemberProject.$valid) {
                    projectMemberService.updateMemberInProject(project_id, { dt: self.dt, releasedate: self.releasedate, project_user_id: self.member.id }).success(function (data) {
                        toastr.success(data.message, 'TMS');
                        projectMemberService.getAllMemberInProject(project_id).success(function (data) {
                            $uibModalInstance.close(data);
                        });
                    });
                }
                else {
                    angular.forEach($scope.addProject.$error.required, function (field) {
                        field.$setDirty();
                    });
                }
            };

            self.cancel = function () {
                $uibModalInstance.dismiss('cancel');
            };

            self.today = function (name) {
                if (name === 'joindate') {
                    self.dt = new Date(self.member.join_date);
                    //var current_year = new Date().getFullYear();
                    //self.user.dt = new Date(current_year - 18, 0, 1);
                } else {
                    // console.log(self.member.release_date);
                    // console.log(self.member.release_date.substring(0,4));
                    // console.log(self.member.release_date.substring(5,7) - 1);
                    // console.log(self.member.release_date.substring(8,10));
                    if (self.member.release_date == null || self.member.release_date == '') {
                        self.releasedate = '';
                    } else {
                        self.releasedate = new Date(self.member.release_date)
                    }
                }
            };
            self.today('joindate');
            self.today('releasedate');

            self.clear = function () {
                self.dt = null;
            };

            self.inlineOptions = {
                customClass: getDayClass,
                minDate: new Date(1950, 0, 1),
                showWeeks: false
            };

            var tday = new Date();
            self.dateOptions1 = {
                formatYear: 'yy',
                maxDate: new Date(tday.getFullYear() + 20, 11, 31),
                minDate: new Date(),
                startingDay: 1,
            };

            self.dateOptions2 = {
                formatYear: 'yy',
                maxDate: new Date(tday.getFullYear() + 20, 11, 31),
                minDate: new Date(),
                startingDay: 1
            };

            // Disable weekend selection
            function disabled(data) {
                var date = data.date,
                    mode = data.mode;
                return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
            }

            self.toggleMin = function () {
                self.dateOptions1.minDate = self.inlineOptions.minDate;
                self.dateOptions2.minDate = self.inlineOptions.minDate;
            };

            self.toggleMin();

            self.open1 = function () {
                self.popup1.opened = true;
            };

            self.open2 = function () {
                self.popup2.opened = true;
            };

            self.setDate = function (year, month, day) {
                self.dt = new Date(year, month, day);
            };

            self.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
            self.format = self.formats[0];
            self.altInputFormats = ['M!/d!/yyyy'];

            self.popup1 = {
                opened: false
            };

            self.popup2 = {
                opened: false
            };

            var tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            var afterTomorrow = new Date();
            afterTomorrow.setDate(tomorrow.getDate() + 1);
            self.events = [
                {
                    date: tomorrow,
                    status: 'full'
                },
                {
                    date: afterTomorrow,
                    status: 'partially'
                }
            ];

            function getDayClass(data) {
                var date = data.date,
                    mode = data.mode;
                if (mode === 'day') {
                    var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

                    for (var i = 0; i < self.events.length; i++) {
                        var currentDay = new Date(self.events[i].date).setHours(0, 0, 0, 0);

                        if (dayToCheck === currentDay) {
                            return self.events[i].status;
                        }
                    }
                }

                return '';
            }
        }]);
})