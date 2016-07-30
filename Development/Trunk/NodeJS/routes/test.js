var express = require('express');
var router = express.Router();
var a = require('../services/test_service');
var models = require('../models/index');

router.get('/a', function(req, res) {
    var b = new a();
    res.json(b.a());
});
module.exports = router;