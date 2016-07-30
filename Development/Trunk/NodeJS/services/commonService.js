var models = require('../models');


function commonService() {

    /**
     * Get User by ID
     * @param req
     * @param res
     */
    this.getUserByID = function (user_id, req, res) {
        models.user.findOne({
            where: {
                id: user_id
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get User by user_id: " + user_id + " success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 204,
                message: "Get User by user_id: " + user_id + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    /**
     * Get all departments
     * @param req
     * @param res
     */
    this.getAllDepartments = function (req, res) {
        models.department.findAll().then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get all department success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 204,
                message: "Get all department failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    /**
     * get all competences by department_id
     * @param req
     * @param res
     */
    this.getCompetencesByDepartmentID = function (department_id, success, error) {
        models.competence.findAll({
            where: {
                department_id: department_id
            }
        }).then(success).catch(error);
    };


    /**
     * get all line managers
     * @param req
     * @param res
     */
    this.getLineManagers = function (req, res) {
        models.user.findAll({
            where: {
                role_id: 5
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get all line managers success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 204,
                message: "Get all line managers failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    /**
     * get all technical skills for user
     * @param user_id
     * @param req
     * @param res
     */
    this.getAllTechnicalSkillsForUser = function (user_id, req, res) {
        models.user_technical_skill.findAll({
            where: {
                user_id: user_id
            }, include: [models.technical_skill]
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get all technical skills for user_id: " + user_id + " success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 204,
                message: "Get all technical skills for user_id: " + user_id + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    /**
     * get all job titles by competence_id
     * @param req
     * @param res
     */
    this.getJobTitlesByCompetenceID = function (competence_id, req, res) {
        models.competence_job_title.findAll({
            where: {
                competence_id: competence_id
            },
            include: [models.job_title]
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get all job titles by competence_id: " + competence_id + " success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 204,
                message: "Get all job titles by competence_id: " + competence_id + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.getDepartmentByID = function (department_id, req, res) {
        models.department.findOne({
            where: {
                id: department_id
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get department by department_id: " + department_id + " success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 204,
                message: "Get department by department_id: " + department_id + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.getCompetenceByID = function (competence_id, req, res) {
        models.competence.findOne({
            where: {
                id: competence_id
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get competence by competence_id: " + competence_id + " success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 204,
                message: "Get competence by competence_id: " + competence_id + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.getJobTitleByID = function (job_title_id, req, res) {
        models.job_title.findOne({
            where: {
                id: job_title_id
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get job title by job_title_id: " + job_title_id + " success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 204,
                message: "Get job title by job_title_id: " + job_title_id + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.getInfoByCompetenceJobTitleID = function (competence_job_title_id, req, res) {
        models.competence_job_title.findOne({
            where: {
                id: competence_job_title_id
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get infomation by competence_job_title_id: " + competence_job_title_id + " success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 204,
                message: "Get information by competence_job_title_id: " + competence_job_title_id + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.checkCompanyEmailExists = function (company_email, req, res) {
        models.user.findOne({
            where: {
                company_email: company_email
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Get userInfo by company_email: " + company_email + " success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "Get userInfo by company_email: " + company_email + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };
}

module.exports = commonService;