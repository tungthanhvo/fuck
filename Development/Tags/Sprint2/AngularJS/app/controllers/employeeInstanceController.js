define(['./module', 'config'], function(controllers, config) {
    'use strict';
    var apiServer = config.api_server;
    controllers.controller("employeeInstanceController", ['$scope', '$http', '$uibModalInstance', 'toastr','createEmpService', function($scope, $http, $uibModalInstance, toastr, createEmpService) {
        var self = this;
        // Set personalinfo and companyinfo info true
        var isValidForm = true;

        // Email Regex
        $scope.mailRegex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
        $scope.nameRegex = /^([^0-9;!@#$%^&*():'"{}/*~`|\/\\?\-_+,.\[\]]*)$/;
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
            gender: '',
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
            personalstatement: '',
            is_activated: 0
        };



        //Fisher–Yates shuffle
        function shuffle(string) {
            var parts = string.split('');
            for (var i = parts.length; i > 0;) {
                var random = parseInt(Math.random() * i);
                var temp = parts[--i];
                parts[i] = parts[random];
                parts[random] = temp;
            }
            return parts.join('');
        }

        self.trailingSpaceFirstName = false;
        self.validateFirstName = function () {
            //console.log(`Project title: ${self.project.name}. First char: ${self.project.name[0]}, Last char: ${self.project.name[self.project.name.length - 1]}`);
            if (Boolean(self.user.firstname) && (self.user.firstname[0] == ' ' || self.user.firstname[self.user.firstname.length - 1] == ' ')) {
                self.trailingSpaceFirstName = true;
                $scope.personalinfo.$setValidity('firstname', false);
                return;
            } else {
                self.trailingSpaceFirstName = false;
            }
        }

        self.trailingSpaceLastName = false;
        self.validateLastName = function () {
            //console.log(`Project title: ${self.project.name}. First char: ${self.project.name[0]}, Last char: ${self.project.name[self.project.name.length - 1]}`);
            if (Boolean(self.user.lastname) && (self.user.lastname[0] == ' ' || self.user.lastname[self.user.lastname.length - 1] == ' ')) {
                self.trailingSpaceLastName = true;
                $scope.personalinfo.$setValidity('lastname', false);
                return;
            } else {
                self.trailingSpaceLastName = false;
            }
        }


        self.checkDate = true;
        self.checkAge = true;
        self.checkJoinDateWithBirthDate = true;
        // Check Date of birth vs Company join date
        self.check2Date = function() {
            var today = new Date();
            
            today.setHours(0, 0, 0, 0);
            self.user.joindate.setHours(23, 59, 59);
            if (self.user.dt == '' || self.user.dt == undefined) {
                self.checkDate = false;
                return;
            }
            if (self.user.joindate.getTime() - self.user.dt.getTime() < 0) {
                self.checkDate = false;
                $scope.companyinfo.$setValidity('joindate', false);
            } else {
                self.checkDate = true;
                $scope.companyinfo.$setValidity('joindate', true);
            }
            if ((self.user.joindate.getTime() - self.user.dt.getTime()) / 31557600000 < 18) {
                self.checkJoinDateWithBirthDate = false;
                $scope.personalinfo.$setValidity('dt', false);
            } else {
                self.checkJoinDateWithBirthDate = true;
                $scope.personalinfo.$setValidity('dt', true);
            }
            if ((today.getTime() - self.user.dt.getTime()) / 31557600000 < 18) {
                self.checkAge = false;
                $scope.personalinfo.$setValidity('dt', false);
            } else {
                $scope.personalinfo.$setValidity('dt', true);
                self.checkAge = true;
            }
        }

        // Get line manager list
        createEmpService.getLineManager().success(function (data) {
            self.linemanager = data.data;
        });

        // Get department list
        createEmpService.getDepartments().success(function (data) {
            self.department = data.data;
        });

        // Get competence list
        self.getCompetenceList = function(dept_id) {
            self.user.jobtitle = '';
            self.jobtitle = '';
            createEmpService.getCompetence(dept_id).success(function (data) {
                self.competence = data.data;
            });
        }

        // Get line manager list
        self.getJobtitleList = function(comp_id) {
            createEmpService.getJobTitle(comp_id).success(function (data) {
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
            createEmpService.countEmp().success(function (data) {
                var a = data.data[0].totalEmp + 1;
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
            var specialChar = '!@#$%^&';
            var numChar = '1234567890';
            var capChar = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            var charSet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&';
            var randomString = '';
            for (var i = 0; i < 5; i++) {
                var c = Math.floor(Math.random() * charSet.length);
                randomString += charSet.charAt(c);
            }
            randomString += specialChar.charAt(Math.random() * specialChar.length);
            randomString += numChar.charAt(Math.random() * numChar.length);
            randomString += capChar.charAt(Math.random() * capChar.length);
            return shuffle(randomString);
        }

        // Set password
        self.user.password = self.generatePass();

        // Validate image 
        $scope.validateImage = function() {
            //An image chosen
            if ($scope.uploadedImage != undefined) {
                $scope.imageTypeErrorMessage = false;
                $scope.imageSizeErrorMessage = false;
                $scope.imageValid = false;
                // Validate extension image jpg, jpeg, bmp, png
                if (!(/\.(jpg|jpeg|bmp|png|JPG|JPEG|BMP|PNG)$/i).test($scope.uploadedImage.name)) {
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
        self.imageValid = true;

        self.checkListUser = false;
        // Check List Username
        self.checkListUsername = function() {
            createEmpService.checkListUsername(self.user.username).success(function(data) {
                if (data.data) {
                    self.checkListUser = true;
                    $scope.personalinfo.$setValidity('username', false);
                } else {
                    self.checkListUser = false;
                    $scope.personalinfo.$setValidity('username', true);
                }
            });
        }

        self.validateUser = function(){
            if ($scope.personalinfo.username.$valid){
                self.checkListUsername();
            } else {
                self.checkListUser = false;
            }
        }

        self.mailExtension = '@harveynash.vn';

        self.validateEmail = function () {
            if ($scope.companyinfo.companyemail.$valid) {
                self.checkExistEmail();
            } else {
                self.checkCompanyEmail = true;
                //$scope.companyinfo.$setValidity('companyemail', true);
            }
        }
        self.checkCompanyEmail = true;
        // Check Company Email
        self.checkExistEmail = function() {
            createEmpService.checkExistEmail(self.user.companyemail, self.mailExtension).success(function(data) {
                if (data.data) {
                    self.checkCompanyEmail = false;
                    $scope.companyinfo.$setValidity('companyemail', false);
                } else {
                    self.checkCompanyEmail = true;
                    $scope.companyinfo.$setValidity('companyemail', true);
                }
            });
        }

        // Event create employee
        self.create = function() {
            isValidForm = $scope.personalinfo.$valid && $scope.companyinfo.$valid;
            $scope.validateImage();
            isValidForm &= $scope.imageValid;
            if (!(!$scope.personalinfo.$valid && !$scope.companyinfo.$valid)) {
                if (!$scope.personalinfo.$valid || !$scope.imageValid) {
                    document.getElementById('personaltab').click();

                } else if (!$scope.companyinfo.$valid) {
                    document.getElementById('companytab').click();
                }
            }

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
            //console.log(self.user);
            var file = $scope.uploadedImage;
            var fd = new FormData();

            self.user.companyemail += self.mailExtension;
            //console.log(self.user.companyemail);
            //self.user.stampcode = Date.now();
            //self.user.avatar = Date.now() + '-' + file.name;
            if (file == undefined) {
                self.user.avatar = "";
            } else {
                self.user.avatar = Date.now() + '-' + file.name.toLowerCase();
                fd.append('file', file, Date.now() + '-' + file.name.toLowerCase());
            }

            fd.append('user', JSON.stringify(self.user));

            $http.post(apiServer + '/api/employees',
                fd, {
                    transformRequest: angular.identity,
                    headers: {
                        'Content-Type': undefined
                    }
                }).success(function(data) {
                toastr.success(data.message, 'TMS');
                //console.log(data);
            }).error(function(data) {
                if (data.message != undefined) {
                    toastr.warning(data.message, 'TMS');
                } else {
                    toastr.warning(data.message, 'TMS');
                }

                //console.log(data.message.message);
            });
            $uibModalInstance.close();
        };

        // Event exit popup
        self.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };

        self.today = function(name) {
            if (name === 'dob') {
                //var current_year = new Date().getFullYear();
                //self.user.dt = new Date(current_year - 18, 0, 1);
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

        var tday = new Date();
        self.dateOptions1 = {
            formatYear: 'yy',
            maxDate: new Date(),
            minDate: new Date(),
            startingDay: 1,
            initDate: new Date(tday.getFullYear() - 18, tday.getMonth(), tday.getDate())
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