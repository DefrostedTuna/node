//===============
// Awesome Form
$(function(){
  var checkForInput = function() {
    var text_val = $(this).val();
    if(text_val === "") {
      $(this).removeClass('has-value');
    } else {
      $(this).addClass('has-value');
    }
  }

  // Checks for input value when page is loaded and when focus leaves input
  $('.input-group input').each(checkForInput).focusout(checkForInput);
});
// End awesome-form
//==================
