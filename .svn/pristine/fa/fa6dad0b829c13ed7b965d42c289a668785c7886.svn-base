var express = require('express');
var router = express.Router();
var employeeService = require('../services/employee_search_service');
var models = require('../models/index');

router.post('/aa', function(req, res) {

});

// router.post('/', function (req, res) {
//    var search = new employeeService();      
//      search.searchUser().then(function (result) {
//          res.json(result.rows[0]);
//          console.log('asdfasdf');
//        });
//     });
router.get('/', function(req, res) {
    var search = new employeeService();
    search.searchUser(req.query).then(function(result) {        
        var resultToSend = [];
        resultToSend[0] = models.Sequelize.getValuesDedup(result.count);
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
            if(result.rows[i].project_users){
                result.rows[i].project_users.forEach(function(element) {
                    if(element.project.status.name==='Running') resultToSend[1][j].project = element.project.name;
                }, this);
            }
            j++;
        }
        res.json(resultToSend);
    }).catch(function(errors) {
        console.log("Error", errors);
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