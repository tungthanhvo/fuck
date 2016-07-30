define(['./module', 'config'], function(controllers, config) {
    'use strict';
    var apiServer = config.api_server;
    controllers.controller("employeeInstanceController", ['$scope', '$http', '$uibModalInstance', function($scope, $http, $uibModalInstance) {
        var self = this;
        // Set personalinfo and companyinfo info true
        var isValidForm = true;

        // Email Regex
        $scope.mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;

        // Set image size and type error message false
        $scope.imageSizeErrorMessage = false;
        $scope.imageTypeErrorMessage = false;

        // Create object user includes personal information and company information send to server
        self.user = {
            username: '',
            password: '',
            staffcode: '',
            avatar: '',
            firstname: '',
            lastname: '',
            nickname: '',
            dt: '',
            gender: '1',
            status: '',
            address: '',
            country: 'Vietnam',
            nationality: 'Vietnamese',
            ext: '',
            mobile: '',
            personalemail: '',
            personalquote: '',
            hobby: '',
            joindate: '',
            companyemail: '',
            department: '',
            competence: '',
            jobtitle: '',
            level: '',
            linemanager: '',
            assign: '',
            personalstatement: ''
        };

        self.checkDate = true;
        // Check Date of birth vs Company join date
        self.check2Date = function() {
            if (self.user.joindate.getTime() - self.user.dt.getTime() < 0) {
                self.checkDate = false;
                $scope.companyinfo.$setValidity('joindate', false);
            } else {
                self.checkDate = true;
                $scope.companyinfo.$setValidity('joindate', true);
            }

        }

        // Get line manager list
        $http.get(apiServer + '/api/misc/employees/linemanagers').success(function(data) {
            console.log(data);
            self.linemanager = data.data;
        });

        // Get department list
        $http.get(apiServer + '/api/misc/employees/departments').success(function(data) {
            console.log(data);
            self.department = data.data;
        });

        // Get competence list
        self.getCompetenceList = function(code) {
            self.user.jobtitle = '';
            self.jobtitle = '';
            $http.get(apiServer + '/api/misc/departments/' + code + '/competence').success(function(data) {
                console.log(data);
                self.competence = data.data;
            });
        }

        // Get line manager list
        self.getJobtitleList = function(code) {
            $http.get(apiServer + '/api/misc/competence/' + code + '/job_title').success(function(data) {
                console.log(data);
                self.jobtitle = data.data;
            });
        }

        // Generate staff code
        self.generateStaffCode = function(code) {
            if (code == undefined) {
                self.user.staffcode = '';
                return;
            }
            var dept_name = self.department.filter(function(dept) {
                return dept.id == code;
            })[0];
            $http.get(apiServer + '/api/misc/departments/' + code + '/employees/count').success(function(data) {
                //var fullcode = dept_name.code + "00000" + data.data[0].total + 1;
                var a = data.data[0].total + 1;
                var numcode = "000" + a;

                self.user.staffcode = dept_name.code + numcode.substr(numcode.length - 3);
            })
        }

        // Get country list from data/country.json
        self.getCountryList = function() {
            $http.get('data/country.json').success(function(data) {
                self.country = data;
            });
        }

        // Load country list into country dropdown list
        self.getCountryList();

        // Get nationality list from data/nationality.json
        self.getNationalityList = function() {
            $http.get('data/nationality.json').success(function(data) {
                self.nationality = data;
            });
        }

        // Load nationality list into country dropdown list
        self.getNationalityList();

        // Generate random password
        self.generatePass = function() {
            var charSet = 'abcdefghijklmnopqrstuvwxyz!@#$%^&ABCDEFGHIJKLMNOP1234567890';
            var randomString = '';
            for (var i = 0; i < 8; i++) {
                var c = Math.floor(Math.random() * charSet.length);
                randomString += charSet.charAt(c);
            }
            return randomString;
        }

        // Set password
        self.user.password = self.generatePass();

        // Validate image 
        $scope.validateImage = function() {
            //An image chosen
            if ($scope.uploadedImage != undefined) {
                $scope.imageValid = false;
                // Validate extension image jpg, jpeg, bmp, png
                if (!(/\.(jpg|jpeg|bmp|png)$/i).test($scope.uploadedImage.name)) {
                    $scope.imageTypeErrorMessage = true;
                    return;
                }
                // Validate image size <= 1MB
                if ($scope.uploadedImage.size / 1024 > 1024) {
                    $scope.imageSizeErrorMessage = true;
                    return;
                }
                $scope.imageValid = true;
                $scope.imageSizeErrorMessage = false;
                $scope.imageTypeErrorMessage = false;
            } else {
                $scope.imageValid = true;
                $scope.imageSizeErrorMessage = false;
                $scope.imageTypeErrorMessage = false;
            }

        }
        $scope.imageValid = true;

        self.checkListUser = false;
        // Check List Username
        self.checkListUsername = function() {
            $http.get(apiServer + '/api/misc/employees/check/' + self.user.username).success(function(data) {
                if (data.data) {
                    self.checkListUser = true;
                    $scope.personalinfo.$setValidity('username', false);
                } else {
                    self.checkListUser = false;
                    $scope.personalinfo.$setValidity('username', true);
                }
            })
        }

        // Event create employee
        self.create = function() {
            isValidForm = $scope.personalinfo.$valid && $scope.companyinfo.$valid;
            isValidForm &= $scope.imageValid;
            //$scope.validateImage();
            console.log(isValidForm);

            if (!isValidForm) {
                // Check valid personal information
                angular.forEach($scope.personalinfo.$error.required, function(field) {
                    field.$setDirty();
                });

                // Check valid company information
                angular.forEach($scope.companyinfo.$error.required, function(field) {
                    field.$setDirty();
                });
                return;
            }
            console.log(self.user);
            var file = $scope.uploadedImage;
            var fd = new FormData();

            //self.user.stampcode = Date.now();
            //self.user.avatar = Date.now() + '-' + file.name;
            if (file == undefined) {
                self.user.avatar = "";
            } else {
                fd.append('file', file, Date.now() + '-' + file.name);
            }

            fd.append('user', JSON.stringify(self.user));

            // var data = {
            //     "first_name": "Minh",
            //     "lastname": "tran"
            // };

            $http.post(apiServer + '/api/employees',
                fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).success(function(data) {
                alert(data.message);
                console.log(data);
            }).error(function(data) {
                alert(data.message.message);
                //console.log(data.message.message);
            });
            $uibModalInstance.close();
        };

        // Event exit popup
        self.cancel = function() {
            $uibModalInstance.dismiss('cancel');
            alert(self.user.avatar);
        };

        self.today = function(name) {
            if (name === 'dob') {
                self.user.dt = new Date();
            } else {
                self.user.joindate = new Date();
            }
        };
        self.today('dob');
        self.today('joindate');

        self.clear = function() {
            self.user.dt = null;
        };

        self.inlineOptions = {
            customClass: getDayClass,
            minDate: new Date(1950, 0, 1),
            showWeeks: false
        };

        self.dateOptions1 = {
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(),
            startingDay: 1
        };

        self.dateOptions2 = {
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(),
            startingDay: 1
        };

        // Disable weekend selection
        function disabled(data) {
            var date = data.date,
                mode = data.mode;
            return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
        }

        self.toggleMin = function() {
            //self.inlineOptions.minDate = self.inlineOptions.minDate ? null : new Date();
            self.dateOptions1.minDate = self.inlineOptions.minDate;
            self.dateOptions2.minDate = self.inlineOptions.minDate;
        };



        self.toggleMin();

        self.open1 = function() {
            self.popup1.opened = true;
        };

        self.open2 = function() {
            self.popup2.opened = true;
        };

        self.setDate = function(year, month, day) {
            self.dt = new Date(year, month, day);
        };

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
        self.events = [{
            date: tomorrow,
            status: 'full'
        }, {
            date: afterTomorrow,
            status: 'partially'
        }];

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