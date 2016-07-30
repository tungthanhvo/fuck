define(['./module', 'config'], function (controllers, config) {
    'use strict';
    controllers.controller('employeeProfileController', ['$rootScope', 'toastr', 'Upload', '$scope', '$log', '$http', 'employeeService', function ($rootScope, toastr, Upload, $scope, $log, $http, employeeService) {
        var _this = this;

        _this.api_server = config.api_server;
        _this.user_id = $scope.editEmpCtrl.user_id;

        // switch mode
        _this.isViewMode = true;

        _this.isShortcutViewMode = true;
        _this.isShortcutEditMode = false;

        _this.isShortcutViewMode = true;
        _this.isShortcutEditMode = false;

        _this.btnViewOrEditMode = "Edit";

        _this.switchMode = function () {

            _this.isViewMode = !_this.isViewMode;
            _this.isShortcutViewMode = !_this.isShortcutViewMode;
            _this.isShortcutEditMode = !_this.isShortcutEditMode;

            if (_this.isViewMode) {
                _this.btnViewOrEditMode = "Edit";
            } else {
                _this.btnViewOrEditMode = "View";
            }

            // disable others tab
            if (_this.isViewMode) {
                $scope.editEmpCtrl.disableAnotherTab = false;
            } else {
                $scope.editEmpCtrl.disableAnotherTab = true;
            }
        };

        //temporary file
        $scope.temp_file = null;

        //update image cancel
        $scope.update_image_cancel = function () {
            $scope.file = null;
            $scope.temp_file = null;
        };

        // upload files/images
        $scope.submit = function () {
            if ($scope.uploadImageForm.file.$valid && $scope.file) {
                $scope.upload($scope.file);
            } else {
                toastr.error('Invalid image format. Only support images extension', 'TMS');
            }
        };

        // upload on file select or drop
        $scope.upload = function (file) {
            Upload.upload({
                url: _this.api_server + '/api/users/update-profile-picture/' + _this.user_id,
                data: {file: file}
            }).then(function (response) {
                console.log('Success ' + response.config.data.file.name + 'uploaded. Response: ' + response.data);
                toastr.success('Profile picture has been updated!!', 'TMS');
                //update new uploaded image
                $scope.editEmpCtrl.isHasImageAvatar = true;
                $scope.editEmpCtrl.imageUrl = response.data.data;
                $scope.temp_file = $scope.file;
                $scope.file = null;

                $rootScope.imageProfile = response.data.data;
            }, function (response) {
                console.log('Error status: ' + response.status);
                toastr.error('Upload picture encountered error!!', 'TMS');
            }, function (event) {
                var progressPercentage = parseInt(100.0 * event.loaded / event.total);
                console.log('progress: ' + progressPercentage + '% ' + event.config.data.file.name);
            });
        };


    }]);
});