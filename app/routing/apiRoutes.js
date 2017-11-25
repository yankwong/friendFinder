var express = require('express');
var router = express.Router();
var path = require('path');
var Friend = require('../data/friend');
var FriendList = require('../data/friendlist');
var fs = require ('fs');
var friendList;

const DATABASE_PATH = path.join(__dirname + '/../data/friendlist.json');


router.post('/friends', function(req, res) {

  var newFriend = new Friend(req.body);

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

    //get best match
    var bestFriend = friendList.getBestMatch(newFriend);

    // push to friendLists
    friendList.addApplicants(newFriend);

    fs.writeFile(DATABASE_PATH, JSON.stringify(friendList.print()), 'utf8', function(err) {
      if (err) return console.log('error writing to JSON', err);
      console.log('write file finished');

      // send back something to trigger modal in frontend
      // case 1: new list
      // if (bestFriend === false) {

      // }
      // // case 2: got a best friend
      // else {

      // }

      //return res.status(200).send();
      res.json(bestFriend);
    });

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