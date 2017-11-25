var express = require('express');
var router = express.Router();
var path = require('path');
var Friend = require('../data/friend');
var FriendList = require('../data/friendlist');
var fs = require ('fs');
var friendList;

const DATABASE_PATH = path.join(__dirname + '/../data/friendlist.json');


router.post('/friends', function(req, res) {

  fs.readFile(DATABASE_PATH, "utf8", function(err, data) {
    if (err) {
      return console.log('read JSON error', err);
    }
    if (typeof(data) === 'undefinied' || data.trim() === '') {
      friendList = new FriendList([]);  
    }
    else {
     friendList = new FriendList(JSON.parse(data));
    }

console.log('hasadsf', req.body);

    var newFriend = new Friend(req.body);
    // push to friendLists
    friendList.addApplicants(newFriend);

    fs.writeFile(DATABASE_PATH, JSON.stringify(friendList.print()), 'utf8', function(err) {
      if (err) return console.log('error writing to JSON', err);
      console.log('write file finished');

      return res.status(200).send();
    });
    
    // use res.body, get total Score
    // call function from Friends to determine the closest match
    // res.send(//an obj)
  });
    
});

router.get('/friends', function(req, res) {
  // This will be used to display a JSON of all possible friends.
  //res.send(hotRestaurant.getTables());
  fs.readFile(DATABASE_PATH, "utf8", function(err, data) {
    if (err) {
      return console.log('read JSON error', err);
    }
    console.log('haha diu');
    res.send(JSON.parse(data));
  });
});

module.exports = router;