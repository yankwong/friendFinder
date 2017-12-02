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

function getTotalDiff(objA, objB) {
  var totalDiff = 0;

  objA.survey.forEach(function(score, index) {
    totalDiff += Math.abs(parseInt(score) - parseInt(objB['survey'][index]));
  })

  return totalDiff;
}

function getAppWithSmallestDiff(apps, app) {
  var closestIndex = -1,
      smallestDiff = -1;

  apps.forEach(function(obj, index) {
    var diff = getTotalDiff(obj, app);

    if (closestIndex === -1) {
      closestIndex = index;
      smallestDiff = diff;
    }
    else if (diff < smallestDiff) {
      closestIndex = index;
      smallestDiff = diff;
    }
  });

  if (typeof apps[closestIndex] === 'undefined') {
    return false;
  }
  else {
    return apps[closestIndex];
  }
}

// old logic, doesn't work if each question means totally different thing
function getAppWithClosestScore(apps, app) {
  var closestIndex = -1,
      smallestDiff = -1;

  apps.forEach(function(obj, index) {
    var diff = Math.abs(parseInt(app.score) - parseInt(obj.score));

    if (closestIndex < 0) {
      closestIndex = index;
      smallestDiff = diff;
    }
    else if (smallestDiff > diff) {
      smallestDiff = diff;
      closestIndex = index;
    }
  });

  if (typeof apps[closestIndex] === 'undefined') {
    return false;
  }
  else {
    return apps[closestIndex];
  }
}

FriendList.prototype.getBestMatch = function(friendObj) {
  var closestMatch = getAppWithSmallestDiff(this.applications, friendObj);

  // new list
  if (closestMatch === false) {
    return false;
  }
  else {
    return closestMatch;
  }
  
}

module.exports = FriendList;