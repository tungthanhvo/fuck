define(['./module', 'config'], function (controllers, config) {
    'use strict';
    var apiServer = config.api_server;
    controllers.controller("projectInstanceController", ['$rootScope','$scope', '$http', '$uibModalInstance', 'toastr', 'projectService', 'metadataService','$location', function ($rootScope, $scope, $http, $uibModalInstance, toastr, projectService, metadataService,$location) {
        var self = this;
        // Event exit popup

        $scope.nameRegex = /^([^0-9;!@#$%^&*():'"{}/*~`|\/\\?\-_+,.\[\]]*)$/;

        self.project = {
            name: '',
            type: '',
            status: '',
            dt: '',
            enddate: '',
            size: '',
            location: 9,
            manager: '',
            deliverymanager: '',
            engagementmanager: '',
            shortdescription: '',
            longdescription: '',
            technologies: '',
            clientname: '',
            clientindustry: '',
            clientdescription: '',
            user_id: '',
        };
        self.metadata = metadataService.createProject;
        self.checkDate = true;

        $scope.validateSize = function(){
            if (self.project.size > 1000000){
                self.project.size = 1000000;
            }
            if (self.project.size < 1){
                self.project.size = 1;
            }
        }

       
        self.start_date_change = function () {

            if (self.project.enddate === null || self.project.enddate === undefined) {
                return;
            }

            var start_date = new Date(self.project.dt).getTime();
            var end_date = new Date(self.project.enddate).getTime();

            if (start_date > end_date) {
                self.isStartDateInvalid = true;
                self.isEndDateInvalid = false;
            } else {
                self.isStartDateInvalid = false;
                self.isEndDateInvalid = false;
            }
        };

        self.end_date_change = function () {
        // if end_date is null, not to validate start_date
            if (self.project.enddate === null || self.project.enddate === undefined) {
                self.isStartDateInvalid = false;
                self.isEndDateInvalid = false;
                return;
            }

            var start_date = new Date(self.project.dt).getTime();
            var end_date = new Date(self.project.enddate).getTime();

            if (end_date < start_date) {
                self.isEndDateInvalid = true;
                self.isStartDateInvalid = false;
            } else {
                self.isEndDateInvalid = false;
                self.isStartDateInvalid = false;
            }
        };

        self.setEndDate = function(){
            if (self.project.status == 2){
                self.project.enddate = new Date().setHours(0,0,0,0);
            }
        }
        
        // Check start date vs end date
        // self.check2Date = function () {
        //     self.checkDate = true;
        //     if (!Boolean(self.project.enddate)) {
        //         return;
        //     }
        //     if (self.project.enddate.getTime() - self.project.dt.getTime() < 0) {
        //         self.checkDate = false;
        //         $scope.projectInfo.$setValidity('enddate', false);
        //     } else {
        //         self.checkDate = true;
        //         $scope.projectInfo.$setValidity('enddate', true);
        //     }
        // }

        // self.checkName = false;
        // self.trailingSpaceName = false;
        // Check List Project Name
        // self.checkListProjectName = function () {
        //     if (self.project.name[0] === ' ' || self.project.name[self.project.name.length - 1] === ' ') {
        //         self.checkName = false;
        //         $scope.projectInfo.$setValidity('name', false);
        //     }
        //     projectService.checkProjectName(self.project.name).success(function (data) {
        //         if (data.existed) {
        //             self.checkName = true;
        //             $scope.projectInfo.$setValidity('name', false);
        //         } else {
        //             self.checkName = false;
        //             $scope.projectInfo.$setValidity('name', true);
        //         }
        //     });
        // }

        // self.validateProject = function () {
        //     if (Boolean(self.project.name) && (self.project.name[0] === ' ' || self.project.name[self.project.name.length - 1] === ' ')) {
        //         self.trailingSpaceName = true;
        //         $scope.projectInfo.$setValidity('name', false);
        //         return;
        //     } else {
        //         self.trailingSpaceName = false;
        //     }
        //     projectService.checkProjectName(self.project.name).success(function (data) {
        //         if (data.existed) {
        //             self.checkName = true;
        //             $scope.projectInfo.$setValidity('name', false);
        //         } else {
        //             self.checkName = false;
        //             $scope.projectInfo.$setValidity('name', true);
        //         }
        //     });

            // if ($scope.projectInfo.name.$valid) {
            //     self.checkListProjectName();
            // } else {
            //     self.checkName = false;
            // }
        //}

        self.create = function () { 
            if ($scope.projectInfo.$valid) {
                self.project.user_id = $rootScope.user.id;
                self.project.dt.setUTCHours(0,0,0,0);
                $http.post(apiServer + '/apii/projects/', self.project).success(function (data) {
                    toastr.success(data.message, 'TMS');
                    $location.path('/projects/'+ data.data);
                }).error(function (err) {
                    toastr.warning(err, 'TMS');
                });
                $uibModalInstance.close();

            }
            else {
                angular.forEach($scope.projectInfo.$error.required, function (field) {
                    field.$setDirty();
                });
            }

        };

        self.cancel = function () {
            $uibModalInstance.dismiss('cancel');
        };


        self.today = function (name) {
            if (name === 'startdate') {
                //var current_year = new Date().getFullYear();
                //self.user.dt = new Date(current_year - 18, 0, 1);
            } else {
                self.project.dt = new Date();
            }
        };
        self.today('startdate');
        self.today('enddate');

        projectService.getProjectManager().success(function (data) {
            self.pm = data.data;
        });

        projectService.getSeniorManager().success(function (data) {
            self.sm = data.data;
        });

        self.clear = function () {
            self.project.dt = null;
        };

        self.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(1950, 0, 1),
            showWeeks: true
        };

        var tday = new Date();
        self.dateOptions1 = {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(tday.getFullYear() + 20, 11, 31),
            minDate: new Date(),
            startingDay: 1
        };

        self.dateOptions2 = {
            //dateDisabled: disabled,
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