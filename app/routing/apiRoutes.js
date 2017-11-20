var express = require('express');
var router = express.Router();
var path = require('path');


router.post('/friends', function(req, res) {
    // This will be used to handle incoming survey results. 
    // This route will also be used to handle the compatibility logic. 
    return res.status(200).send();
});

router.get('/friends', function(req, res) {
  // This will be used to display a JSON of all possible friends.
  //res.send(hotRestaurant.getTables());
});

module.exports = router;