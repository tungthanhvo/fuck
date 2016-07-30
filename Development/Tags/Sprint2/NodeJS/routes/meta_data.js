var express = require('express');
var metadata_router = express.Router();
var metadataService = require('../services/meta_data_service');
var employeeUpdate = require('../services/employee_update');

metadata_router.get('/', function (req, res) {
    var metadata_service = new metadataService();
    var search = new employeeUpdate();
    var a = {};
    console.log('----------');
    metadata_service.loadMetaData().then(function (result) {
        a.job = result;
        metadata_service.loadSkill().then(function (ress) {
            a.skill = ress;
            metadata_service.loadCompetenceJob().then(function (resss) {
                a.competenceJob = resss;
                metadata_service.loadExperience().then(function (ressss) {
                    a.experience = ressss;
                    metadata_service.loadExpertise().then(function (resssss) {
                        a.expertise = resssss;
                        metadata_service.loadRole().then(function (res1) {
                            a.role = res1;
                            metadata_service.loadTechnicalSkill().then(function (res2) {
                                a.technicalSkill = res2;
                                search.loadSkillChildren().then(function (result2) {
                                    a.skillChildren = result2;
                                    search.loadSkillParents().then(function (result3) {
                                        a.skillParents = result3;
                                        a.skillChildren.forEach(function (result4) {
                                            var index_parentid = result4.parent_id - 1;
                                            result4.parent_id = a.skillParents[index_parentid].name;
                                        });
                                        metadata_service.loadLocation().then(function (resultLocation) {
                                            a.location = resultLocation;
                                            metadata_service.loadType().then(function (resultType) {
                                                a.type = resultType;
                                                metadata_service.loadStatus().then(function (resultStatus) {
                                                    a.status = resultStatus;
                                                    metadata_service.loadClientIndustry().then(function (resultClient) {
                                                        a.client_industry = resultClient;
                                                        metadata_service.loadProject().then(function (resultProject) {
                                                            a.project = resultProject;
                                                            res.json(a);
                                                        }).catch(function (errors) {
                                                            res.status(400).json({
                                                                code: 400,
                                                                message: err
                                                            });
                                                        });
                                                    }).catch(function (errors) {
                                                        res.status(400).json({
                                                            code: 400,
                                                            message: err
                                                        });
                                                    });
                                                }).catch(function (errors) {
                                                    res.status(400).json({
                                                        code: 400,
                                                        message: err
                                                    });
                                                });
                                            }).catch(function (errors) {
                                                res.status(400).json({
                                                    code: 400,
                                                    message: err
                                                });
                                            });
                                        }).catch(function (errors) {
                                            res.status(400).json({
                                                code: 400,
                                                message: err
                                            });
                                        });
                                    }).catch(function (errors) {
                                        res.status(400).json({
                                            code: 400,
                                            message: err
                                        });
                                    });
                                }).catch(function (errors) {
                                    res.status(400).json({
                                        code: 400,
                                        message: err
                                    });
                                });
                            }).catch(function (errors) {
                                res.status(400).json({
                                    code: 400,
                                    message: err
                                });
                            });
                        }).catch(function (errors) {
                            res.status(400).json({
                                code: 400,
                                message: err
                            });
                        });
                    }).catch(function (errors) {
                        res.status(400).json({
                            code: 400,
                            message: err
                        });
                    });
                }).catch(function (errors) {
                    res.status(400).json({
                        code: 400,
                        message: err
                    });
                });
            }).catch(function (errors) {
                res.status(400).json({
                    code: 400,
                    message: err
                });
            });
        }).catch(function (errors) {
            res.status(400).json({
                code: 400,
                message: err
            });
        });
    }).catch(function (errors) {
        res.status(400).json({
            code: 400,
            message: err
        });
    });
});

metadata_router.get('/loadskillchildren', function (req, res) {
    var search = new employeeUpdate();
    search.loadSkillChildren().then(function (result) {
        res.json(result);
    });
});

metadata_router.get('/loadskillparents', function (req, res) {
    var search = new employeeUpdate();
    search.loadSkillParents().then(function (result) {
        res.json(result);
    });
});

metadata_router.get('/loadskillmetric', function (req, res) {
    var search = new employeeUpdate();
    search.loadSkillChildren(req.query.id).then(function (result) {
        res.json(result);
    });
});

module.exports = metadata_router;