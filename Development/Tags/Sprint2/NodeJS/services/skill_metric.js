var db = require('../models/index');
var nodemailer = require('nodemailer');
var metadata_service = require('../services/meta_data_service');
var skill_metric = db.skill_metric;
var user = db.user;
var skill = db.skill;

function skillMetricService() {
    var self = this;
    self.retrieveAllByUser_Id = function(user_id, callback_suc, callback_err) {
        skill_metric.findAll({
                where: {
                    user_id: user_id
                },
                include: [{
                    model: db.skill
                }]
            })
            .then(callback_suc).catch(callback_err);
    }

    self.createandupdate = function(params, callback_suc, callback_err) {
        var skillmetric_array = [];
        params.skillmetrics.forEach(function(value) {
            var temp = {
                last_year_used: value.last_year_used,
                is_verified: value.is_verified,
                experience_id: value.experience_id,
                expertise_id: value.expertise.id,
                skill_id: value.skill.id,
                user_id: value.user_id
            }
            if (!value.status.issave) {
                skillmetric_array.push(temp);
            } else {
                temp.id = value.id;
                skillmetric_array.push(temp);
            }
        });

        skill_metric.bulkCreate(
            skillmetric_array, {
                ignoreDuplicates: true,
                updateOnDuplicate: ['last_year_used', 'is_verified', 'experience_id', 'expertise_id', 'skill_id']
            }).then(function() {
            skill_metric.findAll({
                    where: {
                        user_id: params.user_id
                    },
                    include: [{
                        model: db.skill
                    }]
                })
                .then(callback_suc).catch(callback_err);
        });

        self.retrieveEgMLM(params.user_id);
    }

    self.getDOB = function(user_id, callback_suc, callback_err) {
        user.findOne({
            where: {
                id: user_id
            },
            attributes: ['dob']
        }).then(callback_suc).catch(callback_err);
    }

    self.retrieveEgMLM = function(user_id, callback_suc, callback_err) {
        user.findOne({
            where: {
                id: user_id
            },
            attributes: ['line_manager_id', 'first_name', 'last_name', 'staff_code', 'company_email']
        }).then(function(res) {
            var employee = {
                first_name: res.dataValues.first_name,
                last_name: res.dataValues.last_name,
                staff_code: res.dataValues.staff_code,
                company_email: res.dataValues.company_email
            }
            user.findOne({
                where: {
                    id: res.dataValues.line_manager_id
                },
                attributes: ['first_name', 'last_name', 'company_email']
            }).then(function(res) {
                if (res != null) {
                    var line_manager = {
                        first_name: res.dataValues.first_name,
                        last_name: res.dataValues.last_name,
                        company_email: res.dataValues.company_email
                    };
                    self.sendEmail(employee, line_manager);
                }
            })
        })
    }

    self.sendEmail = function(employee, line_manager) {
        var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: 'harveynashtms@gmail.com',
                pass: 'TrinhDepTrai'
            }
        });

        // setup e-mail data with unicode symbols
        var mailOptions = {
            from: employee.company_email, // sender address
            to: line_manager.company_email, // list of receivers
            subject: '[TMS] Remind to verify ' + employee.first_name + ' ' + employee.last_name + ' Skill Metric', // Subject line
            html: '<p>Dear ' + line_manager.first_name + ', </p>' + // html body
                '<p>' + employee.first_name + ' ' + employee.last_name + '(Code:' + employee.staff_code + ') under your line has updated his/her list in Skill Metrics and this required your verification.' + '</p>' +
                '<p>Please arrange your time to verify these update.</p>' +
                '<p>You can access TMS via following link: tms.harveynash.com.vn</p>' +
                '<p>Best Regards,<br/>TMS</p>'
        };

        // send mail with defined transport object
        transporter.sendMail(mailOptions, function(error, info) {
            /*if (error) {
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);*/
        });
    }

    self.delete = function(id, callback_suc, callback_err) {
        skill_metric.destroy({
            where: {
                id: id //this will be your id that you want to delete
            }
        }).then(callback_suc).catch(callback_err);
    }
}

module.exports = skillMetricService;