define(['./module', 'config'], function(controllers, config) {
    'use strict';
    controllers.controller('recent_assignmentController', ['toastr', '$scope', 'pagingService', '$uibModal', 'assignmentService', function(toastr, $scope, pagingService, $uibModal, assignmentService) {
        var self = this;
        self.user_id = $scope.editEmpCtrl.user_id;
        self.pager = {};
        self.recent_assignments = [];
        self.recent_assignments_shown = [];
        var setPage = function(totalItems, currPage, pageSize) {
            if (currPage < 1 || currPage > totalItems) {
                return;
            }
            // get pager object from service
            self.pager = pagingService.GetPager(totalItems, currPage, pageSize);
        };

        function compareFunction(a, b) {
            var minusdate = Date.parse(a.project.start_date) - Date.parse(b.project.start_date);
            return minusdate >= 0 ? false : true;
        }
        self.init = function() {
            assignmentService.retrieveRecentAssignmentAllByUser_Id(self.user_id).then(function(res) {
                self.recent_assignments = res.data.data.sort(compareFunction);
                setPage(self.recent_assignments.length, 1, 5);
                if (self.pager) {
                    self.recent_assignments_shown = self.recent_assignments.slice(0, self.pager.pageSize);
                }

            })

        }
        self.seach = function(page) {
            if (page < 1 || page > self.pager.endPage) {
                return;
            }
            self.pager.currentPage = page;
            self.recent_assignments_shown = [];
            self.recent_assignments_shown = self.recent_assignments.slice(self.pager.pageSize * (page - 1), self.pager.pageSize * (page - 1) + self.pager.pageSize);
        }

        self.checkExportInCV = function(data) {
            assignmentService.updateRecentAssignment(self.user_id, data).then(function(res) {
                if (res.data.code === 200) {
                    if (data.is_included) {
                        toastr.success(data.project.name + " has been included in exporting CV.", 'TMS');
                    } else {
                        toastr.success(data.project.name + " has been removed in exporting CV.", 'TMS');
                    }
                }
            });
        }

        self.openDetail = function(recent_assignment) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'templates/recent_assignment.modal.html',
                controller: 'ModalRecentAssignmentInstanceCtrl',
                backdrop: 'static',
                resolve: {
                    recentassignment: function() {
                        return angular.copy(recent_assignment);
                    }
                }
            });
            modalInstance.result.then(function(data) {
                    assignmentService.updateRecentAssignment(self.user_id, data).then(function(res) {
                        if (res.data.code === 200) {
                            recent_assignment.approval_status = data.approval_status;
                            recent_assignment.my_responsibility = data.my_responsibility;
                            toastr.success(recent_assignment.project.name + " has been updated.", 'TMS');
                        }

                    });
                },
                function() {

                });
        }
    }]);

    controllers.controller('ModalRecentAssignmentInstanceCtrl', function($scope, $uibModalInstance, recentassignment) {
        $scope.recent_assignment = recentassignment;
        $scope.isedit = false;
        $scope.edit = function() {
            $scope.recent_assignmentForm.$valid = false;
            $scope.isedit = true;
        }

        $scope.saveAndSubmit = function() {
            angular.forEach($scope.recent_assignmentForm.$error.required, function(field) {
                field.$setDirty();
            });
            if ($scope.recent_assignmentForm.$valid) {
                $scope.isedit = false;
                if ($scope.recent_assignment.approval_status.id === 1) {
                    $scope.recent_assignment.approval_status = {
                        id: 2,
                        name: "Waiting for approval"
                    }

                }
                $uibModalInstance.close($scope.recent_assignment);
            }
        }

        $scope.save = function() {
            angular.forEach($scope.recent_assignmentForm.$error.required, function(field) {
                field.$setDirty();
            });
            if ($scope.recent_assignmentForm.$valid) {
                $scope.isedit = false;
                $uibModalInstance.close($scope.recent_assignment);
            }
        };

        $scope.cancel = function() {
            $uibModalInstance.dismiss('cancel');
        };
    })
});