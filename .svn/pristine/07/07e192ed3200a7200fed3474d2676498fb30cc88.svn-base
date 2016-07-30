var models = require('../models');


function commonService() {

    this.getUserByID = function (req, res) {

        var user_id = req.params.user_id;

        models.user.findOne({
            where: {
                id: user_id
            }
        }).then(function (data) {
            res.end(JSON.stringify(data));
        });
    }

    this.getAllDepartments = function (req, res) {
        models.department.findAll().then(function (data) {
            res.end(JSON.stringify(data));
        });
    }

    this.getCompetencesByDepartmentID = function (req, res) {
        var departmentID = req.params.departmentID;

        models.competence.findAll({
            where: {
                department_id: departmentID
            }
        }).then(function (data) {
            res.end(JSON.stringify(data));
        });
    }


    this.getLineManagers = function (req, res) {
        models.user.findAll({
            where: {
                role_id: 5
            }
        }).then(function (data) {
            res.end(JSON.stringify(data));
        });
    }

    this.getAllTechnicalSkillsForUser = function (req, res) {

        var userID = req.params.userID;

        models.user_technical_skill.findAll({
            where: {
                user_id: userID
            }, include: [models.technical_skill]
        }).then(function (data) {
            res.end(JSON.stringify(data));
        });
    }

    this.getJobTitlesByDepartmentAndCompetence = function (req, res) {

        var competenceID = req.params.competenceID;
        var results = [{}];

        models.competence_job_title.findAll({
            where: {
                competence_id: competenceID
            },
            include: [models.job_title]
        }).then(function (data) {
            res.end(JSON.stringify(data));
        });
    }
}

module.exports = commonService;