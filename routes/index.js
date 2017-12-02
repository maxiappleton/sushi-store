var express = require('express');
var router = express.Router();

// Redirect to /menu
router.get('/', function(req, res, next) {
  res.redirect('/menu');
});

router.post('/', function(req, res, next) {
  res.redirect('/menu');
});

// Always render index
router.get('/menu', function(req, res, next) {
  // This renders views/index.jade
  res.render('index');
});

module.exports = router;
