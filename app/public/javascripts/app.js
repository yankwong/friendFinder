var YTK = YTK || {};

YTK.friends = (function($) {
  var 
  getFormData = function() {
    var name  = $('.user-name', '#friend-survey').val().trim(),
        image = $('.user-img', '#friend-survey').val().trim(),
        q_0   = $('.q-0', '#friend-survey').val().trim(),
        retVal = {},
        survey = [],
        score = parseInt(q_0);

    survey.push({q0 : q_0});

    retVal = {
      name  : name,
      image : image,
      survey   : survey,
      score : score
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
      }

    })
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