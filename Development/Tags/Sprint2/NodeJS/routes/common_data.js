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
    var user_id = req.params.user_id;
    service.getUserByID(user_id, req, res);
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
commonRouter.get('/competences/:department_id', function (req, res) {
    var department_id = req.params.department_id;
    service.getCompetencesByDepartmentID(department_id, function (response) {
        res.writeHead(200, {"Content-Type": "application/json"});
        // response body
        var json = JSON.stringify({
            code: 200,
            message: "Get all competences by department_id: " + department_id + " success!!",
            data: response
        });
        // send response
        res.end(json);
    }, function (error) {
        res.writeHead(200, {"Content-Type": "application/json"});
        // response body
        var json = JSON.stringify({
            code: 204,
            message: "Get all competences by department_id: " + department_id + " failed!!",
            data: error
        });
        // send response
        res.end(json);
    });

    var test = service.getCompetencesByDepartmentID(1);
    var test2 = service.getCompetencesByDepartmentID(21);

    //console.log('1111111111111: ' + test);
    //console.log('2222222222222: ' + test2);

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
commonRouter.get('/technical-skills/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    service.getAllTechnicalSkillsForUser(user_id, req, res);
});

/**
 * get all job titles by competence_id
 */
commonRouter.get('/job-titles/:competence_id', function (req, res) {
    var competence_id = req.params.competence_id;
    service.getJobTitlesByCompetenceID(competence_id, req, res);
});

/**
 * get department by id
 */
commonRouter.get('/department/:department_id', function (req, res) {
    var department_id = req.params.department_id;
    service.getDepartmentByID(department_id, req, res);
});

/**
 * get competence by id
 */
commonRouter.get('/competence/:competence_id', function (req, res) {
    var competence_id = req.params.competence_id;
    service.getCompetenceByID(competence_id, req, res);
});

/**
 * get job title by id
 */
commonRouter.get('/job-title/:job_title_id', function (req, res) {
    var job_title_id = req.params.job_title_id;
    service.getJobTitleByID(job_title_id, req, res);
});

/**
 * get all information by competence_job_title_id
 */
commonRouter.get('/info/:competence_job_title_id', function (req, res) {
    var competence_job_title_id = req.params.competence_job_title_id;
    service.getInfoByCompetenceJobTitleID(competence_job_title_id, req, res);
});

/**
 * check company_email
 */
commonRouter.get('/check-company-email/:email', function (req, res) {
    var company_email = req.params.email;
    //console.log('----------company_email: ' + company_email);
    service.checkCompanyEmailExists(company_email, req, res);
});


module.exports = commonRouter;