var db = require('../models/index');
var models = require('../models/index');

var project_user_model = db.project_user;

function assignmentService() {
    var self = this;
    self.retrieveRecentAssignmentAllByUser_Id = function (user_id, callback_suc, callback_err) {
        project_user_model.findAll({
            attributes: [
                'id', 'comment', 'my_responsibility', 'is_included'
            ],
            where: {
                user_id: user_id
            },
            include: [{
                attributes: ['name', 'start_date', 'end_date', 'size', 'short_description', 'long_description', 'technology'],
                model: db.project
            }, {
                attributes: ['id', 'name'],
                model: db.approval_status,
            }, {
                attributes: ['name'],
                model: db.project_role,
            }, {
                attributes: ['first_name', 'last_name'],
                model: db.user,
            }]
        })
            .then(callback_suc).catch(callback_err);
    }

    self.create = function (params, callback_suc, callback_err) {

    };

    self.updateRecentAssignment = function (params, callback_suc, callback_err) {
        project_user_model.update({
            my_responsibility: params.my_responsibility,
            is_included: params.is_included,
            approval_status_id: params.approval_status.id
        }, {
            where: {
                id: params.id
            }
        })
            .then(callback_suc).catch(callback_err);
    }

    self.delete = function (id, callback_suc, callback_err) {

    }

    this.addWorkingHistory = function (user_id, req, res) {
        var workingHistory = req.body;
        console.log(workingHistory);
        models.project_history.create({
            name: workingHistory.project_name,
            start_date: workingHistory.project_from,
            end_date: workingHistory.project_to,
            size: workingHistory.project_size,
            role_title: workingHistory.project_role,
            description: workingHistory.project_description,
            my_responsibility: workingHistory.project_responsibility,
            technology: workingHistory.project_technology,
            is_included: 0,
            user_id: user_id
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.updateWorkingHistory = function (history_id, req, res) {
        var workingHistory = req.body;
        console.log(workingHistory);

        if (workingHistory.size == 0) {
            workingHistory.size = null;
        }

        var temp_start_date = "";
        if (workingHistory.start_date == "default" || workingHistory.start_date == "N/A") {
            temp_start_date = null;
        } else {
            temp_start_date = workingHistory.start_date;
        }

        var temp_end_date = "";
        if (workingHistory.end_date == "default" || workingHistory.end_date == "N/A") {
            temp_end_date = null;
        } else {
            temp_end_date = workingHistory.end_date;
        }

        models.project_history.update({
            name: workingHistory.name,
            start_date: temp_start_date,
            end_date: temp_end_date,
            size: workingHistory.size,
            role_title: workingHistory.role_title,
            description: workingHistory.description,
            my_responsibility: workingHistory.my_responsibility,
            technology: workingHistory.technology,
        }, {
            where: {
                id: history_id
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.includeWorkingHistory = function (history_id, req, res) {
        var included = req.body.is_included;
        models.project_history.update({
            is_included: included
        }, {
            where: {
                id: history_id
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.getWorkingHistory = function (history_id, req, res) {
        models.project_history.findOne({
            where: {
                id: history_id
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.getAllHistories = function (user_id, req, res) {
        models.project_history.findAll({
            where: {
                user_id: user_id
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(400, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.deleteHistories = function (array_delete, req, res) {
        models.project_history.destroy({
            where: {
                id: array_delete
            }
        }).then(function (response) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function (error) {
            res.writeHead(200, {"Content-Type": "application/json"});
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };
}

module.exports = assignmentService;