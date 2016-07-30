var express = require('express');
var router = express.Router();
var projectService = require('../services/project_search_service');
var models = require('../models/index');

router.post('/aa', function(req, res) {

});
router.get('/', function(req, res) {
    var searchProj = new projectService();
    var resultToSend = [];
    var programArray = [];
    var engageArray = [];
    var project_managerArray = [];
    var resultToSend1 = [];
    resultToSend1[1] = [];
    searchProj.searchPgm(req.query.program_manager).then(function(result) {
        resultToSend[0] = models.Sequelize.getValuesDedup(result.count);
        resultToSend[1] = [];
        result.rows.forEach(function(element) {
            programArray.push(element.id);
        }, this);
            searchProj.searchEm(req.query.engagement_manager).then(function(resultEm) {
                resultEm.rows.forEach(function(elementEm) {
                    engageArray.push(elementEm.id);
                }, this);
                searchProj.searchProject(req.query).then(function(resultPm) {
                    var count1 = 0;
                    for (var i = 0; i < resultPm.count; i++) {
                        programArray.forEach(function(elementProgram) {
                            engageArray.forEach(function(elementEnga) {
                                if (resultPm.rows[i].id === elementProgram && resultPm.rows[i].id === elementEnga) {
                                    count1++;
                                    resultToSend[1].push(resultPm.rows[i]);
                                }
                            }, this);
                        }, this);
                    }
                    resultToSend[0] = count1;
                    resultToSend1[0] = count1;
                    var k = 0;
                    var resultToSend2 = [];

                    for (var h = (req.query.pagenum - 1) * 15; h < req.query.pagenum * 15; h++) {
                        if (h >= resultToSend[0]) break;
                        resultToSend1[1][k] = {};
                        resultToSend1[1][k].id = resultToSend[1][h].id;
                        resultToSend1[1][k].name = resultToSend[1][h].name;
                        resultToSend1[1][k].client_name = resultToSend[1][h].client_name;
                        resultToSend1[1][k].location = resultToSend[1][h].location.name;
                        resultToSend1[1][k].type = resultToSend[1][h].type.name;
                        resultToSend1[1][k].status = resultToSend[1][h].status.name;
                        resultToSend[1][h].project_users.forEach(function(pm) {
                            if (pm.project_role_id === 13) {
                                resultToSend1[1][k].project_manager = pm.user.first_name + " " + pm.user.last_name;
                            }
                        }, this);

                        k++;
                    }
                    res.json(resultToSend1);
                });
            });
    }).catch(function(errors) {
        res.status(400).json({
            code: 400,
            message: err
        });
    });
});



module.exports = router;