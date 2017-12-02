function Friend(obj) {
  this.name   = obj.name;
  this.score  = obj.score;
  this.survey = obj["survey[]"];  //<-- why does .ajax() add this []??
}


module.exports = Friend;