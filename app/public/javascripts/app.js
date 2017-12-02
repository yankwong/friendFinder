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
  populateBestMatchModal = function(obj) {
    var $bestModal = $('#success-modal'),
        $bestMatchName = $('.best-match', '#success-modal');

    if (obj !== false) {
      $bestMatchName.html(obj.name);
    }

    $bestModal.modal('show');
  },
  initSubmitForm = function() {
    var $submit = $('.submit-btn', '#friend-survey');

    $submit.on('click', function(e) {
      e.preventDefault();
      var dataObj = getFormData();
      console.log('form result', dataObj);
      if (verifyForm(dataObj)) {
        $.ajax({
          dataType: "json",
          method: 'post',
          url: "/api/friends",
          data: dataObj,
        })
        .done(function(data) {
          // the list is empty
          if (data === false) {
            populateBestMatchModal(false);
          }
          else {
            populateBestMatchModal(data);
          }
          console.log('all good!!', data);
        });
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