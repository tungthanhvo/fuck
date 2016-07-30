var express = require('express');
var admin_router = express.Router();

admin_router.get('/:id', function(req, res) {
    res.end('Login successfully');
})

module.exports = admin_router;