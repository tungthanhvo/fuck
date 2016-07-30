var express = require('express');
var project_router = express.Router();
var project_service = require('../services/projects');

project_router.get('/:project_id', function (req, res, next) {
    var get_project_service = new project_service();
    get_project_service.retrieve(req.params.project_id,
        function (data) {
            data.dataValues.project_users.forEach(function (value) {
                if (value.project_role_id == 1) {
                    data.dataValues.program_manager = value;
                } else {
                    if (value.project_role_id == 13) {
                        data.dataValues.project_manager = value;
                    } else {
                        if (value.project_role_id == 2) {
                            data.dataValues.engagement_manager = value;
                        }
                    }
                }

            });
            res.status(200).json({
                code: 200,
                message: 'Get a project info successfully',
                data: data
            }).end();
        },
        function (err) {
            res.status(200).json({
                code: 404,
                message: 'Failed get a project info',
                data: err
            }).end();
        });
});


project_router.post('/', function (req, res, next) {
    console.log(req.body);
    var project = req.body;
    if (!Boolean(project.enddate)) {
        project.enddate = null;
    }
    if (!Boolean(project.clientindustry)) {
        project.clientindustry = null;
    }
    var project_instance = new project_service();
    project_instance.create(project, function (suc,project_id) {
        res.status(201).send({
            data: project_id,
            message: 'Project has been created'
        });
    }, function (err,project_id) {
        res.status(400).send(project_id);
    });
});

project_router.put('/:project_id', function (req, res, next) {
    var update_project_service = new project_service();
    update_project_service.update(req.body, function (data) {
        res.status(200).json({
            code: 200,
            message: 'Update a project info successfully',
            data: data
        }).end();
    }, function (err) {
        res.status(200).json({
            code: 404,
            message: 'Failed Update a project info',
            data: err
        }).end();
    })
});

project_router.delete('/:project_id', function (req, res, next) {
    var delete_project_service = new project_service();
    delete_project_service.delete(req.params.project_id, function (flat, data) {
        if (flat) {
            res.status(200).json({
                code: 200,
                message: 'Delete a project info successfully',
                data: data
            }).end();
        } else {
            res.status(200).json({
                code: 404,
                message: 'Fail Delete a project info',
                data: data
            }).end();
        }

    })
});

project_router.get('/checkProject/:name', function (req, res, next) {
    var project_instance = new project_service();
    project_instance.checkExistProjectName(req.params.name, function (data) {
        if (data) {
            res.status(200).json({
                existed: true
            });
        } else {
            res.status(200).json({
                existed: false
            });
        }
    }, function (err) {
        res.status(500).send(err);
    });
});

project_router.get('/client-industry/:id', function (req, res, next) {
    var service = new project_service();
    var id = req.params.id;
    service.getClientIndustry(id, req, res);
});

project_router.get('/project-location/:id', function (req, res, next) {
    var service = new project_service();
    var id = req.params.id;
    service.getProjectLocation(id, req, res);
});

project_router.get('/project-status/:id', function (req, res, next) {
    var service = new project_service();
    var id = req.params.id;
    service.getProjectStatus(id, req, res);
});

project_router.get('/project-type/:id', function (req, res, next) {
    var service = new project_service();
    var id = req.params.id;
    service.getProjectType(id, req, res);
});


module.exports = project_router;