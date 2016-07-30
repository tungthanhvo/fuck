var pdf = require('../help/pdf_helper');
var fs = require('fs');
var express = require('express');
var export_router = express.Router();
var models = require('../models/index');
var path = require('path');
var async = require('async');
var common_data_service = require('../services/commonService');
var education_service = require('../services/education');
var course_service = require('../services/course');
var jwtDecode = require('jwt-decode');
var accountService = require('../services/accountService');
var exportCVService = require('../services/cv_export_service');

var Docxtemplater = require('docxtemplater');
var ImageModule = require('docxtemplater-image-module');
var moment = require('moment');
var mime = require('mime');

var exportCV_service = new exportCVService();
var info = {} //Store employees's data
    //Render HTML of CV
export_router.get('/export/:id', function(req, res, next) {
    //var type = req.params.type | 'pdf';
    //TODO: Authorization
    // 3 parts: header, payload (important), decodeMethod
    //var token = req.headers.authorization.split(' ')[1];
    //parse payload to get account
    //var account = jwtDecode(token);

    //Retrieve URL of template with data
    exportCV_service.getUserInfo(req.params.id, function(data) {
        data.dataValues.dob = moment(data.dataValues.dob).format('MMMM Do YYYY');
        info.user = data;
        //var dob_formatted = data.dataValues.dob  =

        res.render('cv', info);
    });

    // async.waterfall([
    //     function(done) {
    //         models.user.find({
    //             where: {
    //                 id: req.params.id //Authorization
    //             },
    //             attributes: {
    //                 exclude: ['hash_password', 'username', 'nickname', 'line_manager_id', 'created_at', 'updated_at']
    //             }
    //         }).then(function(data) {
    //             info.user = data;
    //             done();
    //         });
    //     },
    //     function(done) {
    //         models.user_technical_skill.findAll({
    //             where: {
    //                 id: info.user.id
    //             },
    //             include: [models.technical_skill]
    //         }).then(function(data) {
    //             info.technicalSkills = data;
    //             done();
    //         })
    //     },
    //     function(done) {
    //         education_instance = new education_service();
    //         education_instance.retrieveAllByUser_Id(info.user.id, function(data) {
    //             info.education = data;
    //             done();
    //         });
    //     },
    //     function(done) {
    //         course_instance = new course_service();
    //         course_instance.retrieveAllByUser_Id(info.user.id, function(data) {
    //             info.courses = data;
    //             done();
    //         });
    //     },
    //     function(done) {
    //         res.render('cv', info);
    //         //res.end();
    //         done();
    //     }

    // ]);
});


export_router.get('/export/:id/pdf', function(req, res, next) {
    var cookie = req.cookie;
    var source = req.headers.host + '/cv/export/' + req.params.id;
    var destination = path.join(__dirname + '/../tmp/', new Date().getTime() + '.pdf'); /* Declare temporarily save folder. */
    var options = {
        source: source,
        destination: destination,
        cookie: cookie
    }

    var connected = true; // keep track of user connection.
    req.on("close", function() { /* Fire when user disconnect (normally or force). */
        connected = false;
    });
    var account_service_instance = new accountService();
    account_service_instance.getUserByID(req.params.id, function(data) {
        var temp = {};
        temp.data = data;
        pdf.savePDFfromHTML('http://' + source, destination, options, function(code, file) {
            if (code == 0) { /* Convert HTML 2 PDF and save to disk successfully. */
                if (connected) { /* If user still connected. */
                    //res.header('content-type', 'application/pdf'); /* Set header so browser can display it as pdf.*/
                    res.setHeader('Content-disposition', 'attachment; filename=' + data.first_name + ' ' + data.last_name + '.pdf');
                    var stream = fs.createReadStream(file); // Create stream for user to download.
                    stream.on('error', function() { /*Something wrong when streaming.*/

                    });
                    stream.on('close', function() { /* User success to download. */

                    });
                    stream.pipe(res);
                } else { /* If user disconnected when the file is being converted. */ }
            } else { // Something wrong with HTML 2 PDF convert process.
                res.render('error', {
                    Title: "Maintenance",
                    Code: "500",
                    Detail: "Sorry the download feature is under maintenance<br/ > please try again later. "
                }); // Return maintenance page.
            }
        });
    }, function(err) {
        console.log(err);
    });

});
export_router.getGender = function(genderCode) {
    if (genderCode == 1) {
        return "Male";
    } else {
        return "Female";
    }
}
export_router.get('/export/:id/word', function(req, res, next) {
    exportCV_service.getUserInfo(req.params.id, function(data) {
        data.dataValues.dob = moment(data.dataValues.dob).format('MMMM Do YYYY');
        var profile = {};
        profile = JSON.parse(JSON.stringify(data));
        var gender = export_router.getGender(profile.gender);
        var content = fs
            .readFileSync(path.join(__dirname, '..', 'templates', 'input.docx'), "binary");
        var opts = {}
        opts.centered = false;
        opts.getImage = function(tagValue, tagName) {
            return fs.readFileSync(tagValue, 'binary');
        }
        opts.getSize = function(img, tagValue, tagName) {
            return [150, 150];
        }

        var imageModule = new ImageModule(opts);

        var technical_skills = [];
        for (var i = 0; i < profile.user_technical_skills.length; i++) {
            var skillObj = {
                "skill_name": profile.user_technical_skills[i].technical_skill.name,
                "skill_summary": profile.user_technical_skills[i].description
            }
            technical_skills.push(skillObj);
        }

        var skill_metrics = [];
        for (var i = 0; i < profile.skill_metrics.length; i++) {
            var metricObj = {
                "skill_metric_name": profile.skill_metrics[i].skill.name,
                "last_year_used": profile.skill_metrics[i].last_year_used,
                "metric_expertise": profile.skill_metrics[i].expertise.level,
                "metric_experience": profile.skill_metrics[i].experience.level
            }
            skill_metrics.push(metricObj);
        }


        var avatar_link = path.join(__dirname, '..', 'images', 'resized-profile.png');
        if (profile.avatar != null && profile.avatar != '') {
            avatar_link = path.join(__dirname, '..', 'images', 'resized-' + profile.avatar);
        }

        var docx = new Docxtemplater()
            .attachModule(imageModule)
            .load(content)
            .setData({
                "name": profile.first_name + ' ' + profile.last_name,
                "job_title": profile.competence_job_title.job_title.name,
                "dob": profile.dob,
                "gender": gender,
                "nationality": profile.nationality_code,
                "country": profile.country_code,
                "personal_statement": profile.personal_statement || '',
                "technical_skills": technical_skills,
                "courses": profile.courses,
                "education": profile.education,
                "employment": profile.employee_histories,
                "skill_metrics": skill_metrics,
                image: avatar_link
            });
        docx.render();

        var buffer = docx
            .getZip()
            .generate({
                type: "nodebuffer"
            });
        var name = profile.first_name + ' ' + profile.last_name;
        var file = path.join(__dirname, '..', 'templates', new Date().getTime() + name + '.docx');
        fs.writeFile(file, buffer, function(err, data) {

            if (err) {
                //  return console.log(err);
            }
            var filename = path.basename(file);
            var mimetype = mime.lookup(file);
            res.setHeader('Content-disposition', 'attachment; filename=' + name + '.docx');
            res.setHeader('Content-type', mimetype);
            var filestream = fs.createReadStream(file);
            filestream.pipe(res);
        });
    });
});

module.exports = export_router;