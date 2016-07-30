define(['./module', 'config', 'underscore'], function(module, config, _) {
    module.controller('searchController', ['$http', '$scope', 'pagingService', 'metadataService', function(http, scope, pagingService, metadataService) {
        var vm = this;
        vm.show = {};
        vm.form = {};
        vm.pager = {};        
        vm.titles = [];
        vm.totalItem = 0;
        
        var setPage = function(total, page) {
            if (page < 1 || page > vm.pager.totalPages) {
                return;
            }
            // get pager object from service
            vm.pager = pagingService.GetPager(total, page, 15);
            vm.pager.isFirst = vm.pager.currentPage == 1;
            vm.pager.isLast = vm.pager.currentPage == vm.pager.totalPages;
        }

        vm.showItem = function(name) {
            vm.show[name] = !vm.show[name];
        };

        var mapData = function(callback) {
            var data = {};
            data.first_name = vm.form.first_name;
            data.last_name = vm.form.last_name;
            Object.keys(vm.show).forEach(function(item) {
                if (vm.show[item] && vm.form[item]) {
                    data[item] = vm.form[item].trim();
                }
            });
            return callback(data);
        }

        vm.sendData = function(page) {
            mapData(function(data) {
                data.pagenum = page || 1;
                http({
                    url: config.api_server + '/api/search',
                    params: data,
                    method: "GET"
                }).then(function(response) {
                    vm.users = response.data[1];
                    vm.totalItem = response.data[0];
                    setPage(response.data[0], page);
                });
            });
        };

        vm.resetFields = function() {
            vm.form = {};
        }

        if (scope.$parent.homeCtrl.isSearch) {
            scope.$parent.homeCtrl.isSearch = false;
            vm.form.first_name = scope.$parent.homeCtrl.searchText;
            vm.sendData();
        }

        scope.$on('onSearch', function(event, obj) {
            vm.form.first_name = obj.text;
            vm.sendData();
        });

    }]);
});