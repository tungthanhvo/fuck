var express = require('express');
var router = express.Router();
var assignmentService = require('../services/assignmentService');
var models = require('../models/index');
var service = new assignmentService();

router.get('/histories/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    service.getAllHistories(user_id, req, res);
});

router.post('/history/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    service.addWorkingHistory(user_id, req, res);
});

router.post('/update-history/:user_id', function (req, res) {
    var user_id = req.params.user_id;
    service.updateWorkingHistory(user_id, req, res);
});


router.post('/included-history/:history_id', function (req, res) {
    var history_id = req.params.history_id;
    service.includeWorkingHistory(history_id, req, res);
});


router.get('/history/:history_id', function (req, res) {
    var history_id = req.params.history_id;
    service.getWorkingHistory(history_id, req, res);
});

router.post('/delete-histories', function (req, res) {
    var array_delete = req.body.data;
    service.deleteHistories(array_delete, req, res);
});

module.exports = router;