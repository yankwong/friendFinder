var express = require('express');
var router = express.Router();
var path = require('path');

// survey
router.get('/survey', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../public/survey.html'));
});

module.exports = router;