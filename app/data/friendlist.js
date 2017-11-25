function FriendList(initList) {
  this.applications = initList;
}

function randomIntFromInterval(min,max) {
    return Math.floor(Math.random()*(max-min+1)+min);
}

FriendList.prototype.addApplicants = function(friendObj) {
  this.applications.push(friendObj);
}

FriendList.prototype.print = function(friendObj) {
  return this.applications;
}

FriendList.prototype.getBestMatch = function(friendObj) {
  var totalFriends = this.applications.length,
      random = randomIntFromInterval(0, totalFriends);

  // new list
  if (totalFriends === 0) {
    return false;
  }
  else {
    return this.applications[random];
  }
  
}

module.exports = FriendList;