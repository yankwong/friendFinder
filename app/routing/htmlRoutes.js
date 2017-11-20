var express = require('express');
var router = express.Router();
var path = require('path');

// survey
router.get('/survey', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/survey.html'));
});

// anything else go to home
router.get('*',function (req, res) {
  res.sendFile(path.resolve(__dirname, '../public/home.html'));
});

module.exports = router;