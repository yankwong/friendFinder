function Friend(obj) {
  this.name   = obj.name;
  this.image  = obj.image;
  this.survey = obj.survey;
}

Friend.prototype.getScore = function() {

}

module.exports = Friend;