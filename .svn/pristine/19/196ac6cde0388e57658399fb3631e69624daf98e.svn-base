define(['./module', 'config'], function (controllers, config) {
    'use strict';
    controllers.controller("projectMemberController", ['$scope', '$http', '$uibModal', 'toastr', '$log', '$location', 'projectMemberService', 'pagingService', 'projectService', '$rootScope',
        function ($scope, $http, $uibModal, toastr, $log, $location, projectMemberService, pagingService, projectService, $rootScope) {
            var self = this;

            self.project_date = {};
            $rootScope.$on('getStarDate_Project', function (event, data) {
                self.project_date = data;
            });

            self.pager = {};
            self.currentMembers_shown = [];
            var setPage = function (totalItems, currPage, pageSize) {
                if (currPage < 1 || currPage > totalItems) {
                    return;
                }
                // get pager object from service
                self.pager = pagingService.GetPager(totalItems, currPage, pageSize);
            };
            self.seach = function (page) {
                if (page < 1 || page > self.pager.endPage) {
                    return;
                }
                self.pager.currentPage = page;
                self.currentMembers_shown = [];
               
                if (self.pager) {
                    for (var i = self.pager.pageSize * (page - 1); i < self.members.length && i < self.pager.pageSize * (page - 1) + self.pager.pageSize; i++) {
                        self.members.push(self.workingHistories[i]);
                    }
                    //_this.workingHistories_Shown = _this.workingHistories.slice(_this.pager.pageSize * (page - 1), _this.pager.pageSize * (page - 1) + _this.pager.pageSize);
                }
                //self.currentMembers_shown = self.members.slice(self.pager.pageSize * (page - 1), self.pager.pageSize * (page - 1) + self.pager.pageSize);
            }

            $scope.animationsEnabled = true;
            $scope.open = function () {
                var url = $location.path();
                var project_id = url.split('/')[2];
                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: 'templates/project_member_add.modal.html',
                    controller: 'ModalProjectAddMemberInstanceCtrl',
                    controllerAs: 'addMember',
                    size: null,
                    backdrop: 'static',
                    resolve: {
                        startdate: function () {
                            return angular.copy(self.project_date);
                        }
                    }
                });

                modalInstance.result.then(function (data) {
                    self.approverName = data.data[data.data.length - 1];
                    //console.log(self.approverName);
                    data.data.pop();
                    for (var i = 0; i < data.data.length; i++) {
                        for (var j = 0; j < self.approverName.length; j++) {
                            if (data.data[i].approver == self.approverName[j].id) {
                                data.data[i].approverInfo = self.approverName[j];
                                continue;
                            }
                        }
                    }
                    // self.members = data.data;
                    // setPage(self.members.length, 1, 15);

                    // self.currentMembers_shown = self.members.slice(0, self.pager.pageSize);
                    //console.log(self.members);
                    self.members = [];
                    self.currentMembers_shown = [];
                    angular.forEach(data.data, function (value, index) {
                        value.is_delete = false;
                        self.members.push(value);
                    });

                    if (self.members.length) {
                        setPage(self.members.length, 1, 15);
                        for (var i = 0; i < self.members.length && i < self.pager.pageSize; i++) {
                            self.currentMembers_shown.push(self.members[i]);
                        }
                    }
                }, function () { });
            };

            self.init = function () {

            }
            self.currentMembers = [];
            $scope.openEdit = function (curMember) {
                //console.log('ok');
                //console.log(curMember);
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    templateUrl: 'templates/project_member_edit.modal.html',
                    controller: 'ModalProjectEditMemberInstanceCtrl',
                    controllerAs: 'editMember',
                    backdrop: 'static',
                    size: null,
                    resolve: {
                        member: function () {
                            return angular.copy(curMember);
                        },
                        startdate: function () {
                            return angular.copy(self.project_date);
                        }
                    }
                });
                modalInstance.result.then(function (data) {
                    self.approverName = data.data[data.data.length - 1];
                    //console.log(self.approverName);
                    data.data.pop();
                    for (var i = 0; i < data.data.length; i++) {
                        for (var j = 0; j < self.approverName.length; j++) {
                            if (data.data[i].approver == self.approverName[j].id) {
                                data.data[i].approverInfo = self.approverName[j];
                                continue;
                            }
                        }
                    }
                    //self.members = data.data;
                    //setPage(self.members.length, 1, 15);
                    //self.currentMembers_shown = self.members.slice(0, self.pager.pageSize);
                    //console.log(self.members);
                    // $scope.selected = selectedItem;
                    self.members = [];
                    self.currentMembers_shown = [];
                    angular.forEach(data.data, function (value, index) {
                        value.is_delete = false;
                        self.members.push(value);
                    });

                    if (self.members.length) {
                        setPage(self.members.length, 1, 15);
                        for (var i = 0; i < self.members.length && i < self.pager.pageSize; i++) {
                            self.currentMembers_shown.push(self.members[i]);
                        }
                    }
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            };

            $scope.toggleAnimation = function () {
                $scope.animationsEnabled = !$scope.animationsEnabled;
            };

            var url = $location.path();
            var project_id = url.split('/')[2];
            //console.log(project_id);
            self.approverName = [];
            self.members = [];
            self.removeList = [];
            self.updateRemoveList = function (id) {
                if (self.removeList.indexOf(id) == -1) {
                    self.removeList.push(id);
                }
                else {
                    //self.removeList = _.without(self.removeList, _.findWhere(self.removeList, id));
                    for (var i = 0; i < self.removeList.length; i++) {
                        if (self.removeList[i] == id) {
                            self.removeList.splice(i, 1);
                            break;
                        }
                    }
                }
                //console.log(self.removeList);
            }
            projectMemberService.getAllMemberInProject(project_id).success(function (data) {
                //console.log(data);
                self.approverName = data.data[data.data.length - 1];
                //console.log(self.approverName);
                data.data.pop();
                for (var i = 0; i < data.data.length; i++) {
                    for (var j = 0; j < self.approverName.length; j++) {
                        if (data.data[i].approver == self.approverName[j].id) {
                            data.data[i].approverInfo = self.approverName[j];
                            continue;
                        }
                    }
                }
                self.members = [];
                angular.forEach(data.data, function (value, index) {
                    value.is_delete = false;
                    self.members.push(value);
                });

                if (self.members.length) {
                    setPage(self.members.length, 1, 15);
                    for (var i = 0; i < self.members.length && i < self.pager.pageSize; i++) {
                        self.currentMembers_shown.push(self.members[i]);
                    }
                }

                //self.members = data.data;

                //self.currentMembers_shown = self.members.slice(0, self.pager.pageSize);
                //console.log(self.members);
            });

            self.deleteMembers = function () {
                if (self.removeList == '' || self.removeList == null) {
                    toastr.warning('Please choose deleted member', 'TMS');
                }
                else {
                    var modalInstance = $uibModal.open({
                        animation: true,
                        templateUrl: 'templates/delete.html',
                        controller: 'deleteController',
                        backdrop: 'static',
                        resolve: {
                            content_modal: function () {
                                return {
                                    section_title: 'Delete Members',
                                    msg: 'Are you sure you want to delete these members ?'
                                };
                            }
                        }
                    });
                    modalInstance.result.then(function () {

                        //console.log(self.members);
                        projectMemberService.deleteMemberInProject(project_id, self.removeList).success(function (data) {
                            toastr.success(data.message, 'TMS');
                            self.removeList = [];
                            self.currentMembers_shown = [];
                            projectMemberService.getAllMemberInProject(project_id).success(function (data) {
                                //console.log(data);
                                self.approverName = data.data[data.data.length - 1];
                                //console.log(self.approverName);
                                data.data.pop();
                                for (var i = 0; i < data.data.length; i++) {
                                    for (var j = 0; j < self.approverName.length; j++) {
                                        if (data.data[i].approver == self.approverName[j].id) {
                                            data.data[i].approverInfo = self.approverName[j];
                                            continue;
                                        }
                                    }
                                }

                                self.members = [];
                                angular.forEach(data.data, function (value, index) {
                                    value.is_delete = false;
                                    self.members.push(value);
                                });

                                if (self.members.length) {
                                    setPage(self.members.length, 1, 15);
                                    for (var i = 0; i < self.members.length && i < self.pager.pageSize; i++) {
                                        self.currentMembers_shown.push(self.members[i]);
                                    }
                                }

                                //self.members = data.data;
                                //setPage(self.members.length, 1, 15);
                                //self.currentMembers_shown = self.members.slice(0, self.pager.pageSize);
                                //console.log(self.members);
                            });
                        });
                    }, function () {

                    });
                }


            }
        }
    ]);


})