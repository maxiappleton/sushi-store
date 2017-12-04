var express = require('express');
var router = express.Router();

// Redirect to /menu
router.get('/', function(req, res, next) {
  res.redirect('/menu');
});

router.post('/', function(req, res, next) {
  res.redirect('/menu');
});

router.get('/menu/:id', function(req, res, next) {
  res.render('index');
});

router.get('/checkout', function(req, res, next) {
  res.render('index');
});

// Always render index
router.get('/menu', function(req, res, next) {
  // This renders views/index.jade
  res.render('index');
});

module.exports = router;
