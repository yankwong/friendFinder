var YTK = YTK || {};

YTK.friends = (function($) {
  var TOTALQUESTIONS = 2,
  getSurveyAns = function(total) {
    var surveyPage = '.survey-page',
        results = [];

    if (typeof total === 'undefined' || total <= 0) {
      total = TOTALQUESTIONS;
    }

    for (var i=0; i < total; i++) {
      var $question = $('.q-'+i, surveyPage),
          answer = parseInt($question.val().trim());

          results.push(answer);
    }
    return results;
  },
  getTotalScore = function(scoreArr) {
    return scoreArr.reduce(function(total, num) {
      return total + parseInt(num);
    })
  },
  getFormData = function() {
    var name  = $('.user-name', '#friend-survey').val().trim(),
        retVal = {},
        survey = getSurveyAns(),
        score = getTotalScore(survey);

    retVal = {
      name      : name,
      survey    : survey,
      score     : score
    };

    return retVal;
  }
  verifyForm = function(obj) {
    return true;
  },
  initSubmitForm = function() {
    var $submit = $('.submit-btn', '#friend-survey');

    $submit.on('click', function(e) {
      e.preventDefault();
      var dataObj = getFormData();
      console.log('form result', dataObj);
      if (verifyForm(dataObj)) {

        var xhr = new XMLHttpRequest();
        xhr.open("POST", "/api/friends", true);
        xhr.setRequestHeader("Content-type", "application/json;charset=UTF-8");
        xhr.onreadystatechange = function() {
          if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 200) {
            console.log('all good', JSON.stringify(dataObj));
          }
          else if (xhr.readyState == XMLHttpRequest.DONE && xhr.status == 404) {
            console.log('all bad');
          }
        }
        xhr.send(JSON.stringify(dataObj));
      }
      else {
        alert('Please fill out all the required fields');
        return false;
      }
    });
  },
  initPage = function() {
    initSubmitForm();
  };

return {
    initPage : initPage
  }
})(jQuery);

$(function() {
  YTK.friends.initPage();
});