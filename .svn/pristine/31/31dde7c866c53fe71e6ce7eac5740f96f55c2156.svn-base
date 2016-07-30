var db = require('../models/index');

var project_model = db.project;
var project_user_model = db.project_user;
var async = require('async');

function projectService() {
    var self = this;
    self.retrieve = function(project_id, callback_suc, callback_err) {
        project_model.findOne({
            where: {
                id: project_id
            },
            include: [{
                model: db.project_user,
                include: [{
                    model: db.user,
                    attributes: ['first_name', 'last_name', 'id']
                }]
            }, {
                model: db.location
            }, {
                model: db.status
            }, {
                model: db.client_industry
            }, {
                model: db.type
            }]
        }).then(callback_suc).catch(callback_err);
    }

    self.create = function(params, callback_suc, callback_err) {
        var project = params;
        return db.sequelize.transaction(function(t) {
            return project_model.create({
                name: project.name,
                start_date: project.dt,
                end_date: project.enddate,
                size: project.size,
                short_description: project.shortdescription,
                long_description: project.longdescription,
                technology: project.technologies,
                client_name: project.clientname,
                is_included: true,
                client_description: project.clientdescription,
                client_industry_id: project.clientindustry,
                status_id: project.status,
                type_id: project.type,
                location_id: project.location
            }, {
                transaction: t
            }).then(function(data) {
                project.id = data.dataValues.id;
                return db.project_user.bulkCreate([{
                        approval_status: 0,
                        project_id: data.id,
                        project_role_id: 13,
                        user_id: project.manager
                    }, {
                        approval_status: 0,
                        project_id: data.id,
                        project_role_id: 1,
                        user_id: project.deliverymanager
                    }, {
                        approval_status: 0,
                        project_id: data.id,
                        project_role_id: 2,
                        user_id: project.engagementmanager
                    }

                ], {
                    transaction: t
                });
            })
        }).then(function(data){
        callback_suc(data,project.id);
        }).catch(function(err){
callback_suc(err,project.id);
        });
    }

    self.update = function(params, callback_suc, callback_err) {
        var array_project_users = [{
            id: params.project_manager.id,
            user_id: params.project_manager.user_id
        }, {
            id: params.program_manager.id,
            user_id: params.program_manager.user_id
        }, {
            id: params.engagement_manager.id,
            user_id: params.engagement_manager.user_id
        }];

        project_user_model.bulkCreate(
            array_project_users, {
                ignoreDuplicates: true,
                updateOnDuplicate: ['user_id']
            }).then(function() {
            project_model.update({
                    "name": params.name,
                    "start_date": params.start_date,
                    "end_date": params.end_date,
                    "size": params.size,
                    "short_description": params.short_description,
                    "long_description": params.long_description,
                    "technology": params.technology,
                    "client_name": params.client_name,
                    "is_included": params.is_included,
                    "client_industry_id": params.client_industry_id,
                    "location_id": params.location_id,
                    "type_id": params.type_id,
                    "status_id": params.status_id,
                    "client_description": params.client_description
                }, {
                    where: {
                        id: params.id
                    }
                })
                .then(callback_suc).catch(callback_err);
        });
    }

    self.delete = function(project_id, callback) {
        async.waterfall([
            function(callback) {
                project_user_model.findAll({
                    where: {
                        project_id: project_id
                    }
                }).then(function(data) {
                    var flag = true;
                    var length = data.length;
                    for (var i = 0; i < length; i++) {
                        if (data[i].user_id) {
                            flag = false;
                            break;
                        }
                    }
                    if (flag) {
                        project_user_model.destroy({
                            where: {
                                project_id: project_id
                            }
                        }).then(function(data) {
                            callback(null, true, data);
                        }).catch(function(err) {
                            callback(null, false, err);
                        });
                    } else {
                        callback(null, false, "Can not delete because more than on assigners");
                    }
                });

            },
            function(flag, first_res, callback) {
                if (flag) {
                    project_model.destroy({
                        where: {
                            id: project_id
                        }
                    }).then(function(data) {
                        callback(null, true, data);
                    }).catch(function(err) {
                        callback(null, false, err);
                    });
                } else {
                    callback(null, false, first_res);
                }
            }
        ], function(err, flag, result) {
            callback(flag, result);
        })

    }

    self.checkExistProjectName = function(name, callback_suc, callback_err) {
        project_model.findOne({
            where: {
                name: name
            }
        }).then(callback_suc).catch(callback_err);
    }


    self.getClientIndustry = function(id, req, res) {
        db.client_industry.findOne({
            where: {
                id: id
            }
        }).then(function(response) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function(error) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        })
    };

    self.getProjectLocation = function(id, req, res) {
        db.location.findOne({
            where: {
                id: id
            }
        }).then(function(response) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function(error) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        })
    };

    self.getProjectStatus = function(id, req, res) {
        db.status.findOne({
            where: {
                id: id
            }
        }).then(function(response) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function(error) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        })
    };

    self.getProjectType = function(id, req, res) {
        db.type.findOne({
            where: {
                id: id
            }
        }).then(function(response) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function(error) {
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        })
    };
}

module.exports = projectService;