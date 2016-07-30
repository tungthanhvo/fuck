var models = require('../models/index');

function userService() {

    this.updateTechnicalSkillsForUser = function (req, res) {
        var user_id = req.params.user_id;

        console.log(req.body);

        var _description = function (key) {
            if (key == 'os') {
                return req.body.os;
            }
            if (key == 'languages') {
                return req.body.languages;
            }
            if (key == 'databases') {
                return req.body.databases;
            }
            if (key == 'commsAndNetworks') {
                return req.body.commsAndNetworks;
            }
            if (key == 'packages') {
                return req.body.packages;
            }
            if (key == 'methodologies') {
                return req.body.methodologies;
            }
        };

        var getTechnicalSkillID = function (key) {
            if (key == 'os') {
                return 1;
            }
            if (key == 'databases') {
                return 4;
            }
            if (key == 'languages') {
                return 2;
            }
            if (key == 'commsAndNetworks') {
                return 5;
            }
            if (key == 'packages') {
                return 6;
            }
            if (key == 'methodologies') {
                return 3;
            }
        };

        Object.keys(req.body).forEach(function (key) {

            var _id = getTechnicalSkillID(key);

            models.user_technical_skill.update({
                description: _description(key),
            }, {
                where: {
                    technical_skill_id: _id,
                    user_id: user_id
                }
            }).then(function (response) {
                var _response = JSON.stringify(response);
                if (_response == '[0]') {
                    console.log('creating: ' + key);

                    models.user_technical_skill.create({
                        description: _description(key),
                        technical_skill_id: _id,
                        user_id: user_id
                    }).then(function (response) {
                        console.log('created: ' + key);
                    });
                } else {
                    // have record to update
                }
            }).catch(function (err) {
                res.status(200).json({
                    code: 404,
                    message: 'update failed',
                    data: err
                }).end();
            })
        });
    }

    this.updatePersonalInforationForUser = function (req, res) {
        var user_id = req.params.user_id;

        var _gender = function (key) {
            if (key == 'male') {
                return 1;
            } else if (key == 'female') {
                return 0;
            } else {
                return key;
            }
        };

        console.log(req.body);

        models.user.update({
            fist_name: req.body.fistName,
            last_name: req.body.lastName,
            address: req.body.address,
            country_code: req.body.countryCode,
            nationality_code: req.body.nationalityCode,
            dob: req.body.dob,
            gender: _gender(req.body.gender),
            married_status: req.body.status
        }, {
            where: {
                id: user_id
            }
        }).then(function (data) {
            console.log('updated okk');
            res.status(200).json({
                code: 200,
                message: 'update success',
                data: data
            }).end();
        }).catch(function (err) {
            console.log(err);
            res.status(200).json({
                code: 404,
                message: 'update failed',
                data: err
            }).end();
        });
    }

    this.updateCompanyInformationForUser = function (req, res) {
        var user_id = req.params.user_id;

        console.log(req.body);

        var competence_id = req.body.competence;
        var job_title_id = req.body.jobTitle;

        models.competence_job_title.findOne({
            where: {
                competence_id: competence_id,
                job_title_id: job_title_id
            }
        }).then(function (response) {

            models.user.update({
                company_join_date: req.body.company_join_date,
                competence_job_title_id: response.dataValues.id,
                line_manager_id: req.body.lineManager,
                personal_email: req.body.email,
                department: req.body.department
            }, {
                where: {
                    id: user_id
                }
            }).then(function (data) {
                console.log('updated okk');
                res.status(200).json({
                    code: 200,
                    message: 'update success',
                    data: data
                }).end();
            });
        }).catch(function (err) {
            console.log(err);
            res.status(200).json({
                code: 404,
                message: 'update failed',
                data: err
            }).end();
        });
    }
}


module.exports = userService;