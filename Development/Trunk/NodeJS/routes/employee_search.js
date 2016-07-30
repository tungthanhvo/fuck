var express = require('express');
var router = express.Router();
var employeeService = require('../services/employee_search_service');
var models = require('../models/index');

router.post('/aa', function (req, res) {

});

router.get('/', function (req, res) {
    var search = new employeeService();
    search.searchUser(req.query).then(function (result) {
        if (req.query.project_id) {
            req.query.project_id = undefined;
            search.searchUser(req.query).then(function (result2) {
                search.searchProject().then(function (resultProject) {
                    var finalResult = [];
                    finalResult[0] = result.rows.length;
                    finalResult[1] = [];
                    for (var i = 0; i < finalResult[0]; i++) {
                        for (var h = 0; h < result2.rows.length; h++) {
                            if (result2.rows[h].id === result.rows[i].id) {
                                finalResult[1].push(result2.rows[h]);
                            }
                        }
                    }
                    var resultToSend = [];
                    resultToSend[0] = finalResult[0];
                    resultToSend[1] = [];
                    var j = 0;
                    for (i = (req.query.pagenum - 1) * 15; i < req.query.pagenum * 15; i++) {
                        if (i >= resultToSend[0]) break;
                        resultToSend[1][j] = {};
                        resultToSend[1][j].id = finalResult[1][i].id;
                        resultToSend[1][j].first_name = finalResult[1][i].first_name;
                        resultToSend[1][j].last_name = finalResult[1][i].last_name;
                        resultToSend[1][j].job_title = finalResult[1][i].competence_job_title.job_title.name;
                        resultToSend[1][j].company_join_date = finalResult[1][i].company_join_date;
                        resultToSend[1][j].project = [];
                        if (finalResult[1][i].project_users) {
                            for (var p = 0; p < finalResult[1][i].project_users.length; p++) {
                                for (var q = 0; q < resultProject.rows.length; q++) {
                                    if (finalResult[1][i].project_users[p].project.status.name === 'Running' && finalResult[1][i].project_users[p].project_id === resultProject.rows[q].id) {``
                                        resultToSend[1][j].project.push(finalResult[1][i].project_users[p].project.name);
                                        break;
                                    }
                                }
                            }
                        }
                        for(var g=0; g<resultToSend[1][j].project.length;g++){
                            var count = 0;
                            for(var w=0; w<resultToSend[1][j].project.length;w++){
                                if(resultToSend[1][j].project[g] === resultToSend[1][j].project[w]){
                                    count++;
                                    if(count>1){
                                        resultToSend[1][j].project.splice(w, 1);
                                    }
                                }
                            }
                        }
                        j++;
                    }                    
                    res.json(resultToSend);
                });
            });
        }
        else {
            search.searchProject().then(function (resultProject) {
                var resultToSend = [];
                resultToSend[0] = models.Sequelize.getValuesDedup(result.rows.length);
                resultToSend[1] = [];
                var j = 0;
                for (var i = (req.query.pagenum - 1) * 15; i < req.query.pagenum * 15; i++) {
                    if (i >= resultToSend[0]) break;
                    resultToSend[1][j] = {};
                    resultToSend[1][j].id = models.Sequelize.getValuesDedup(result.rows[i].id);
                    resultToSend[1][j].first_name = models.Sequelize.getValuesDedup(result.rows[i].first_name);
                    resultToSend[1][j].last_name = models.Sequelize.getValuesDedup(result.rows[i].last_name);
                    resultToSend[1][j].job_title = models.Sequelize.getValuesDedup(result.rows[i].competence_job_title.job_title.name);
                    resultToSend[1][j].company_join_date = models.Sequelize.getValuesDedup(result.rows[i].company_join_date);
                    resultToSend[1][j].project = [];
                    if (result.rows[i].project_users) {
                        for (var l = 0; l < result.rows[i].project_users.length; l++) {
                            for (var q = 0; q < resultProject.rows.length; q++) {
                                if (result.rows[i].project_users[l].project.status.name === 'Running' && result.rows[i].project_users[l].project_id === resultProject.rows[q].id) {
                                    resultToSend[1][j].project.push(result.rows[i].project_users[l].project.name);
                                    break;
                                }
                            }
                        }
                    }
                    for(var g=0; g<resultToSend[1][j].project.length;g++){
                            var count = 0;
                            for(var w=0; w<resultToSend[1][j].project.length;w++){
                                if(resultToSend[1][j].project[g] === resultToSend[1][j].project[w]){
                                    count++;
                                    if(count>1){
                                        resultToSend[1][j].project.splice(w, 1);
                                    }
                                }
                            }
                        }
                    j++;
                }
                res.json(resultToSend);
            });
        }
    }).catch(function (errors) {
    });
});



module.exports = router;

//   this.searchProject = function() {

//         var employee_service;

//         var init = function() {
//             employee_service = new require('employeeService');

//             dependency_container = {
//                 new require(""),
//                 new require(""),
//                 new require(""),
//                 new require(""),
//             }

//         }();

//         employee_service

//     }