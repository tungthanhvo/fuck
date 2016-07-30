/**
 * Created by tungvot on 6/28/2016.
 */
var express = require('express');
var commonRouter = express.Router();
var commonService = require('../services/commonService');
var models = require('../models');
var service = new commonService();

/**
 * get user by ID
 */
commonRouter.get('/users/:user_id', function (req, res) {
    service.getUserByID(req, res);
});


/**
 * get all departments
 */
commonRouter.get('/departments', function (req, res) {
    service.getAllDepartments(req, res);
});

/**
 * get all competences by departmentID
 */
commonRouter.get('/competences/:departmentID', function (req, res) {
    service.getCompetencesByDepartmentID(req, res);
});


/**
 * get all line managers
 */
commonRouter.get('/line-managers', function (req, res) {
    service.getLineManagers(req, res);
});

/**
 * get all technical skills for user
 */
commonRouter.get('/technical-skills/:userID', function (req, res) {
    service.getAllTechnicalSkillsForUser(req, res);
});

/**
 * get all job titles by department & competence
 */
commonRouter.get('/job-titles/:competenceID', function (req, res) {
    service.getJobTitlesByDepartmentAndCompetence(req, res);
});

commonRouter.get('/department/:departmentID', function (req, res) {
    var departmentID = req.params.departmentID;

    models.department.findOne({
        where: {
            id: departmentID
        }
    }).then(function (response) {
        res.end(JSON.stringify(response))
    });

});

commonRouter.get('/competence/:competenceID', function (req, res) {
    var competenceID = req.params.competenceID;

    models.competence.findOne({
        where: {
            id: competenceID
        }
    }).then(function (response) {
        res.end(JSON.stringify(response));
    });

});

commonRouter.get('/job-title/:jobTitleID', function (req, res) {
    var jobTitleID = req.params.jobTitleID;

    models.job_title.findOne({
        where: {
            id: jobTitleID
        }
    }).then(function (response) {
        res.end(JSON.stringify(response));
    });

});

commonRouter.get('/info/:id', function (req, res) {
    var id = req.params.id;

    models.competence_job_title.findOne({
        where: {
            id: id
        }
    }).then(function (response) {
        res.end(JSON.stringify(response));
    });

});


module.exports = commonRouter;