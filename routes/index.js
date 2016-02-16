var express = require('express');
var NodePie = require("nodepie");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'Home',
  });
});
router.get('/:character/:server/', function(req, res, next) {
  res.render('index', {
    title: 'Home',
    character: req.params.character,
    server: req.params.server
  });
});

module.exports = router;
