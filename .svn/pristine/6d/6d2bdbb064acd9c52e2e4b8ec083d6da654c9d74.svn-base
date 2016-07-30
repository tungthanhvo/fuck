var models = require('../models/index');
var fs = require('fs');

function employeeService() {
    var projectModel = models.project;

    this.setModel = function(model) {
        projectModel = model.project;
        return true;
    };


    this.searchProject = function(query) {
        var project_managerRequired = false;
        var name = {};
        var first_name = '';
        var last_name = '';
        var locationRequired = false;
        var typeRequired = false;
        var statusRequired = false;
        var client_industryRequired = false;
        var statusWhere = {};
        var locationWhere = {};
        var typeWhere = {};
        var sectornWhere = {};
        var project_managerWhere = {};
        if (query.location) {
            locationWhere = {
                id: query.location
            };
            locationRequired = true;
        }
        if (query.project_status) {
            statusWhere = {
                id: query.project_status
            };
            statusRequired = true;
        }
        if (query.project_type) {
            typeWhere = {
                id: query.project_type
            };
            typeRequired = true;
        }
        if (query.sector) {
            sectornWhere = {
                id: query.sector
            };
            client_industryRequired = true;
        }
        if (query.project_manager) {
            project_managerRequired = true;
            project_managerWhere = {
                project_role_id: 13
            };
            name = query.project_manager.split(" ");
            first_name = name[0];
        }
        if (name.length > 1) {
            for (var i = 1; i < name.length; i++) {
                last_name += name[i];
                if (i !== name.length - 1) last_name += " ";
            }
        }
        return models.project.findAndCountAll({
            attributes: ['id', 'name', 'client_name'],
            include: [{
                model: models.project_user,
                required: project_managerRequired,
                where: project_managerWhere,
                include: [{
                    model: models.user,
                    required: project_managerRequired,
                    attributes: ['first_name', 'last_name'],
                    where: {
                        first_name: {
                            $like: '%' + (first_name || '') + '%'
                        },
                        last_name: {
                            $like: '%' + (last_name || '') + '%'
                        }
                    }
                }]
            }, {
                model: models.client_industry,
                attributes: ['id', 'name'],
                required: client_industryRequired,
                where: sectornWhere
            }, {
                model: models.type,
                attributes: ['id', 'name'],
                required: typeRequired,
                where: typeWhere
            }, {
                model: models.status,
                attributes: ['id', 'name'],
                required: statusRequired,
                where: statusWhere
            }, {
                model: models.location,
                attributes: ['id', 'name'],
                required: locationRequired,
                where: locationWhere
            }],
            where: {
                $or: [{
                    long_description: {
                        $like: '%' + (query.project_description || '') + '%'
                    }
                }, {
                    short_description: {
                        $like: '%' + (query.project_description || '') + '%'
                    }
                }],
                name: {
                    $like: '%' + (query.project_name || '') + '%'
                },
                client_name: {
                    $like: '%' + (query.client_name || '') + '%'
                },
                technology: {
                    $like: '%' + (query.technologies || '') + '%'
                }
            }
        });

    };

    this.searchEm = function(engagement_manager) {
        var name = {};
        var engagement_managerRequired = false;
        var first_name = '';
        var last_name = '';
        var engagement_managerWhere = {};
        if (engagement_manager) {
            engagement_managerRequired = true;
            engagement_managerWhere = {
                project_role_id: 2
            };
            name = engagement_manager.split(" ");
            first_name = name[0];
        }
        if (name.length > 1) {
            for (var i = 1; i < name.length; i++) {
                last_name += name[i];
                if (i !== name.length - 1) last_name += " ";
            }
        }
        return models.project.findAndCountAll({
            attributes: ['id'],
            include: [{
                model: models.project_user,
                attributes: ['id', 'user_id', 'project_id', 'project_role_id'],
                where: engagement_managerWhere,
                required: engagement_managerRequired,
                include: [{
                    model: models.user,
                    required: engagement_managerRequired,
                    where: {
                        first_name: {
                            $like: '%' + (first_name || '') + '%'
                        },
                        last_name: {
                            $like: '%' + (last_name || '') + '%'
                        }
                    }
                }]
            }]
        });
    };

    this.searchPgm = function(program_manager) {
        var name = {};
        var first_name = '';
        var program_managerRequired = false;
        var last_name = '';
        var program_managerWhere = {};
        if (program_manager) {
            program_managerRequired = true;
            program_managerWhere = {
                project_role_id: 1
            };
            name = program_manager.split(" ");
            first_name = name[0];
        }
        if (name.length > 1) {
            for (var i = 1; i < name.length; i++) {
                last_name += name[i];
                if (i !== name.length - 1) last_name += " ";
            }
        }
        return models.project.findAndCountAll({
            attributes: ['id'],
            required: program_managerRequired,
            include: [{
                model: models.project_user,
                attributes: ['id', 'user_id', 'project_id', 'project_role_id'],
                where: program_managerWhere,
                required: program_managerRequired,
                include: [{
                    model: models.user,
                    required: program_managerRequired,
                    where: {
                        first_name: {
                            $like: '%' + (first_name || '') + '%'
                        },
                        last_name: {
                            $like: '%' + (last_name || '') + '%'
                        }
                    }
                }]
            }]
        });
    };
}
module.exports = employeeService;