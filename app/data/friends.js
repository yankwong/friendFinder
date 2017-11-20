function Friends() {
  this.applications = [];
}

Friends.prototype.addApplicants = function(applicant) {
  this.applications.push(applicant);
}

module.exports = Friends;