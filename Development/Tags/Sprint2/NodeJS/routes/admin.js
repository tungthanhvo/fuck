var express = require('express');
var router = express.Router();


router.get('/retrieve',function(req,res,next){
res.send('respond with a resource');
});

module.exports = router;
var express = require('express');
var admin_router = express.Router();

admin_router.get('/:id', function(req, res) {
    res.end('Login successfully');
})

module.exports = admin_router;
