var express = require('express');
var router = express.Router();
var employeeService = require('../services/employee_search_service');
var models = require('../models_temp/index');

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
    search.searchUser(req.query.first_name, req.query.last_name, req.query.job_title, req.query.course, req.query.technical_skill, req.query.skill_metric, req.query.expertise_level_from, req.query.expertise_level_to, req.query.employment_status, req.query.pagenum).then(function(result) {
        var resultToSend = [];
        resultToSend[0] = models.Sequelize.getValuesDedup(result.count);
        resultToSend[1] = [];
        var j = 0;
        for (var i = (req.query.pagenum - 1) * 15; i < req.query.pagenum * 15; i++) {
            if (i >= resultToSend[0]) break;
            resultToSend[1][j] = models.Sequelize.getValuesDedup(result.rows[i]);
            j++;
            console.log(models.Sequelize.getValuesDedup(result.rows[i]));
        }
        res.json(resultToSend);
    });
});



module.exports = router;