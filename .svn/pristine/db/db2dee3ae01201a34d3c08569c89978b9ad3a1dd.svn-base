var models = require('../models/index');
var fs = require('fs');
var Jimp = require("jimp");


function userService() {

    this.updateTechnicalSkillsForUser = function(user_id, req, res) {

        //console.log(req.body);
        //console.log('user_id: ' + user_id);

        var _description = function(key) {
            if (key === 'os') {
                return req.body.os;
            }
            if (key === 'languages') {
                return req.body.languages;
            }
            if (key === 'databases') {
                return req.body.databases;
            }
            if (key === 'commsAndNetworks') {
                return req.body.commsAndNetworks;
            }
            if (key === 'packages') {
                return req.body.packages;
            }
            if (key === 'methodologies') {
                return req.body.methodologies;
            }
        };

        var getTechnicalSkillID = function(key) {
            if (key === 'os') {
                return 1;
            }
            if (key === 'languages') {
                return 2;
            }
            if (key === 'methodologies') {
                return 3;
            }
            if (key === 'databases') {
                return 4;
            }

            if (key === 'commsAndNetworks') {
                return 5;
            }
            if (key === 'packages') {
                return 6;
            }

        };

        Object.keys(req.body).forEach(function(key) {

            var _technical_skill_id = getTechnicalSkillID(key);

            //console.log(_technical_skill_id);
            //console.log(_description(key));

            models.user_technical_skill.update({
                description: _description(key),
            }, {
                where: {
                    technical_skill_id: _technical_skill_id,
                    user_id: user_id
                }
            }).then(function(response) {
                var _response = JSON.stringify(response);
                if (_response === '[0]') {
                    //console.log('creating: ' + key);
                    models.user_technical_skill.create({
                        description: _description(key),
                        technical_skill_id: _technical_skill_id,
                        user_id: user_id
                    }).then(function(response) {
                        //console.log('created: ' + key);
                    });
                } else {
                    // have record to update
                    //console.log('updated: ' + key);
                }
            }).catch(function(error) {
                // response body
                var json = JSON.stringify({
                    code: 400,
                    message: "Update technical skills for user: " + user_id + " failed!!",
                    data: error
                });
                // send response
                res.end(json);
            })
        });

        // response body
        var json = JSON.stringify({
            code: 200,
            message: "Update technical skills for user: " + user_id + " success!!",
            data: 1
        });
        // send response
        res.end(json);
    };

    this.updatePersonalInforationForUser = function(user_id, req, res) {
        // log req.body
        //console.log(req.body);
        // update
        models.user.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            address: req.body.address,
            country_code: req.body.country_code,
            nationality_code: req.body.nationality_code,
            dob: req.body.dob,
            nickname: req.body.nickname,
            gender: req.body.gender,
            married_status: req.body.married_status,
            personal_email: req.body.personal_email
        }, {
            where: {
                id: user_id
            }
        }).then(function(response) {
            //console.log('++++++++++++++updated success');
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 200,
                message: "Update personal information for user: " + user_id + " success!!",
                data: response
            });
            // send response
            res.end(json);
        }).catch(function(error) {
            //console.log('++++++++++++++updated failed');
            //console.log(error);
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "Update personal information for user: " + user_id + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.updateCompanyInformationForUser = function(user_id, req, res) {

        //console.log(req.body);

        var competence_id = req.body.competence_id;
        var job_title_id = req.body.job_title_id;

        models.competence_job_title.findOne({
            where: {
                competence_id: competence_id,
                job_title_id: job_title_id
            }
        }).then(function(response) {

            models.user.update({
                company_join_date: req.body.company_join_date,
                competence_job_title_id: response.dataValues.id,
                line_manager_id: req.body.line_manager_id,
                company_email: req.body.company_email,
                level: req.body.level,
                skype_id: req.body.skype_id
            }, {
                where: {
                    id: user_id
                }
            }).then(function(response) {
                //console.log('+++++++++++++updated ok!!');
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                // response body
                var json = JSON.stringify({
                    code: 200,
                    message: "Update company information for user: " + user_id + " success!!",
                    data: response
                });
                // send response
                res.end(json);
            });
        }).catch(function(error) {
            //console.log(error);
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "Update company information for user: " + user_id + " failed!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };

    this.updateProfilePictureForUser = function(user_id, req, res) {
        // log all data information of file
        //console.log('------------------file-info-------------');
        //console.log(req.file);
        //console.log('-----------------------------------------');
        // remove ex_avatar if existed
        models.user.findOne({
            where: {
                id: user_id
            }
        }).then(function(response) {

            var ex_avatar = response.dataValues.avatar;

            if (ex_avatar !== null && ex_avatar !== undefined && ex_avatar !== '') {
                // must to delete ex_avatar
                fs.unlink('./images/' + ex_avatar, function(error) {
                    if (error) {
                        //console.error(error);
                    }
                    //console.log("Deleted file: " + ex_avatar + " succesfully!!");
                });
            } else {
                //console.log('-----------Not have avatar yet!!');
            }

            var original_extension = req.file.originalname;
            original_extension = original_extension.substring(original_extension.lastIndexOf('.'));

            // update image avatar
            models.user.update({
                avatar: req.file.filename + original_extension
            }, {
                where: {
                    id: user_id
                }
            }).then(function(response) {
                // resize image
                Jimp.read("./images/" + req.file.filename, function(err, lenna) {
                    console.log("./images/" + req.file.filename);
                    if (err) throw err;
                    lenna.resize(256, 256) // resize
                        .quality(60) // set JPEG quality
                        .write("./images/" + "resized-" + req.file.filename + original_extension); // save
                });

                //console.log('+++++++++++++updated profile picture ok!!');
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                // response body
                var json = JSON.stringify({
                    code: 200,
                    message: "Update profile picture for user: " + user_id + " success!!",
                    data: req.file.filename + original_extension
                });
                // send response
                res.end(json);
            }).catch(function(error) {
                //console.log('+++++++++++++updated profile picture failed!!');
                res.writeHead(200, {
                    "Content-Type": "application/json"
                });
                // response body
                var json = JSON.stringify({
                    code: 400,
                    message: "Update company information for user: " + user_id + " failed!!",
                    data: error
                });
                // send response
                res.end(json);
            });
        }).catch(function(error) {
            //console.log('+++++++++++++something went wrong!!');
            res.writeHead(200, {
                "Content-Type": "application/json"
            });
            // response body
            var json = JSON.stringify({
                code: 400,
                message: "something went wrong!!",
                data: error
            });
            // send response
            res.end(json);
        });
    };
}

module.exports = userService;