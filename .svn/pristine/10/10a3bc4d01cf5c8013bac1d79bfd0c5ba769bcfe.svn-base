var models = require('../models/index');
var async = require('async');

function CVExportService() {
    var self = this;
    self.getUserInfo = function(user_id, success, error) {
        async.waterfall([
            function(done) {
                models.user.find({
                    include: [{
                        model: models.user_technical_skill,
                        attributes: ['description'],
                        required: false,
                        include: [{
                            model: models.technical_skill,
                            attributes: ['name']
                        }]
                    }, {
                        model: models.competence_job_title,
                        required: false,
                        include: [{
                            model: models.competence,
                            required: false,
                            attributes: ['name']
                        }, {
                            model: models.job_title,
                            required: false,
                            attributes: ['name']
                        }]
                    }, {
                        model: models.employee_history,
                        required: false
                    }, {
                        model: models.course,
                        required: false
                    }, {
                        model: models.education,
                        required: false
                    }, {
                        model: models.skill_metric,
                        required: false,
                        include: [{
                            model: models.skill,
                            required: false
                        }, {
                            model: models.expertise,
                            required: false
                        }, {
                            model: models.experience,
                            required: false
                        }]
                    }],
                    where: {
                        id: user_id //Authorization
                    },
                    attributes: {
                        exclude: ['hash_password', 'username', 'nickname', 'line_manager_id', 'created_at', 'updated_at']
                    },
                }).then(success).catch(error);
            }
            // function(done) {
            //     success(data);
            //     //res.end();
            //     done();
            // }

        ]);
    }
}

module.exports = CVExportService;