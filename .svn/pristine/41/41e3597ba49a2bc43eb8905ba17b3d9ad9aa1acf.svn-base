var db = require('../models/index');
var project_type = db.type;
var project_status = db.status;
var projectmanager = db.user;
var seniors = db.user;
var client_industry = db.client_industry;
var location = db.location;
var async = require('async');

function validateService() {
    self.validateDateOfBirthSkillMetric = function(user_id, lastyearused, callback) {
        user.findOne({
            where: {
                id: params.user_id
            },
            attributes: ['dob']
        }).then(function(data) {
            var year_dob = new Date(data.dataValues.dob).getFullYear();
            callback(year_dob < lastyearused);
        });
    }
    self.validateProjectInformation = function(project, callback) {
        /* async.waterfall([
                 function(res, callback) {

                 },
             }*/
    }
}

module.exports = validateService;