function FriendList(initList) {
  this.applications = initList;
}

FriendList.prototype.addApplicants = function(friendObj) {
  this.applications.push(friendObj);
}

FriendList.prototype.print = function(friendObj) {
  return this.applications;
}

FriendList.prototype.getBestMatch = function(friendObj) {
  
}

module.exports = FriendList;