var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/retrieve', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/create', function(req, res, next) {
  res.send('respond with a resource');
});

router.put('/update/:id', function(req, res, next) {
  res.send('respond with a resource');
});

router.delete('/delete/:id', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;