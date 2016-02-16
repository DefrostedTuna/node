var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/r/:subreddit/', function(req, res, next) {
  res.render('index', {
    subreddit: req.params.subreddit,
  });
});
router.get('/r/:subreddit/:character/:server', function(req, res, next) {
  res.render('index', {
    subreddit: req.params.subreddit,
    character: req.params.character,
    server: req.params.server,
  });
});
router.get('/:character/:server/', function(req, res, next) {
  res.render('index', {
    character: req.params.character,
    server: req.params.server,
  });
});

module.exports = router;
