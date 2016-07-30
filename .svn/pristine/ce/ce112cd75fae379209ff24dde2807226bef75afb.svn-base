define(['./module', 'config', 'underscore', 'domReady!', 'lang'], function(module, config, _, document, lang) {
    module.controller('searchController', ['$http', '$scope', 'pagingService', 'smoothScroll', 'searchService', 'metadataService', '$rootScope', 
        function(http, scope, pagingService, smoothScroll, searchService, metadata, rootScope) {
        var vm                           = this;
        vm.metadata                      = metadata.Search;
        vm.searchType                    = rootScope.searchType || 'Employee';
        vm.toolTip                       = {};
        vm.showEmployeeForm              = true;
        vm.show                          = {};
        vm.show.employee                 = {};
        vm.show.employee.job_title       = true;
        vm.show.employee.technical_skill = true;
        vm.show.employee.skill_metric    = true;
        vm.show.project                  = {};
        vm.show.project.location         = true;
        vm.show.project.project_name     = true;
        vm.form                          = {};
        vm.reset                         = true;
        vm.form.employee                 = {};
        vm.form.project                  = {};
        vm.pager                         = {};
        vm.titles                        = [];
        vm.totalItem                     = 0;
        vm.showSearchResult              = false;
        vm.showMsg                       = false;
        vm.msg                           = lang.UC15;
        var searchType                   = {};
        var searchData                   = {};
        var scrollOption                 = {};
        scrollOption.duration            = 400;

        scope.$emit('setTitle', {text:'Search ' + vm.searchType});
        
        var showNoResult = function() {
            vm.showSearchResult = false;
            vm.showMsg2         = false;
            vm.showMsg1         = true;
            vm.showMsg          = true;
        };     

        var hideMsg = function() {
            vm.showMsg  = false;
            vm.showMsg1 = false;
            vm.showMsg2 = false;
        };

        showNoResult();        
                
        var setPage = function(total, page) {
            if(page < 1 || page > vm.pager.totalPages) {
                return;
            }
            // get pager object from service
            vm.pager = pagingService.GetPager(total, page, 15);
            vm.pager.isFirst = vm.pager.currentPage == 1;
            vm.pager.isLast = vm.pager.currentPage == vm.pager.totalPages;
        };

        vm.showEmployeeItem = function(name) {
            vm.show.employee[name] = !vm.show.employee[name];
        };

        vm.showProjectItem = function(name) {
            vm.show.project[name] = !vm.show.project[name];
        };

        vm.search = function(reset, page) {            
            if(reset) {
                searchType = vm.searchType;
                searchData = mapData();                
            } 
            if(reset && searchType == 'Employee' && !isFormValid()) { 
                showInvalid();
                return;
            } 
            hideMsg();
            searchData.pagenum = page || 1;
            sendData().then(function(response) {               
                showResult(response);
            });            
        }

        var sendData = function() {
            if(searchType == 'Employee') {                
                return searchService.searchEmployee(searchData);                 
            } else {                                
                return searchService.searchProject(searchData);                
            }
        };

        var mapData = function() {            
            var data = {};            
            if(searchType == 'Employee') {
                data.first_name = vm.form.employee.first_name;
                data.last_name = vm.form.employee.last_name;
                if(vm.show.employee.expertise_level) {
                    data.expertise_level_from = vm.form.employee.expertise_level_from;
                    data.expertise_level_to = vm.form.employee.expertise_level_to;
                }               
                Object.keys(vm.show.employee).forEach(function(item) {                    
                    if(vm.show.employee[item] && vm.form.employee[item]) {                        
                        if (typeof vm.form.employee[item] == 'string') {
                            data[item] = vm.form.employee[item].trim();
                        } else {
                            data[item] = vm.form.employee[item];
                        }
                    }
                });
            } else {
                Object.keys(vm.show.project).forEach(function(item) {
                    if(vm.show.project[item] && vm.form.project[item]) {
                        data[item] = (typeof vm.form.project[item] == 'string') ? vm.form.project[item].trim() : vm.form.project[item];
                        // if (typeof vm.form.project[item] == 'string') {
                        //     data[item] = vm.form.project[item].trim();
                        // } else {
                        //     data[item] = vm.form.project[item];
                        // }
                    }
                });
            }            
            return data;                
        }

        var showResult = function(response) {
            if(response.data[0] == 0) {
                showNoResult();
                return;
            }
            hideMsg();
            setPage(response.data[0], searchData.pagenum);            
            if(searchType == 'Employee') {
                vm.employees = response.data[1];
            } else {
                vm.projects = response.data[1];
            }
            vm.totalItem         = response.data[0];
            vm.showEmployeeTable = (searchType == 'Employee');
            vm.showProjectTable  = (searchType == 'Project');
            vm.showSearchResult  = true;            
            scrollTop();
        };

        vm.checkForm = function() {
            if(!isFormValid()) {
                showInvalid();                
            } else {
                hideInvalid();
            }
        };

        vm.changeType = function() {
            showNoResult();
            vm.resetFields();
            scope.$emit('setTitle', {text:"Search " + vm.searchType});
        };

        var showInvalid = function() {
            vm.showMsg2 = false; 
            setTimeout(function() {
                vm.showMsg2 = true; 
                scope.$apply();
            }, 0);
        };

        var hideInvalid = function() {
            vm.showMsg2 = false;
        }

        var isFormValid = function() {              
            var from = vm.form.employee.expertise_level_from;
            var to = vm.form.employee.expertise_level_to;
            var selected = vm.show.employee.expertise_level;
            if(!selected || !from || !to ) {
                return true;
            }
            return from <= to;
        };        

        vm.setTooltip = function(data, id) {
            if(!id) {
                vm.toolTip[data] = 'All';
                return;
            };
            vm.metadata[data+'s'].forEach(function (item) {
                if(item.id == id) {                    
                    vm.toolTip[data] = item.name;
                }
            });
        };

        vm.resetFields = function() {  
            scrollTop();
            hideInvalid();
            Object.keys(vm.toolTip).forEach(function(item) {
                vm.toolTip[item] = 'All';
            });
            if(vm.searchType == 'Employee') {                        
                vm.form.employee = {};
            } else {
                vm.form.project = {};
            }            
        };  

        var scrollTop = function() {
            var element = document.getElementById('top-page');
            smoothScroll(element, scrollOption);            
        };

        if(scope.$parent.homeCtrl.isSearch) {
            scope.$parent.homeCtrl.isSearch = false;
            vm.form.employee.first_name = scope.$parent.homeCtrl.searchText;
            vm.searchType = 'Employee';
            vm.search(true);
        };

        scope.$on('onSearch', function(event, obj) {
            vm.form.employee.first_name = obj.text;
            vm.searchType = 'Employee';
            vm.search(true);
        });

        scope.$on('changeSearch', function(event, obj) {
            vm.searchType = obj.type;
            vm.changeType();
        });

    }]);
});