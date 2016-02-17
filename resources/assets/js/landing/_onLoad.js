$(function() {
  //====================
  // On load animations
  $("body").fadeIn();
  $('.character-class-wrap').click(function(){
     $('.character-classes').slideToggle('slow');
  });
  $('.character-minion-wrap').click(function(){
      $('.character-minions').slideToggle('slow');
  });
  $('.character-mount-wrap').click(function(){
      $('.character-mounts').slideToggle('slow');
  });
  $('.article-video').fitVids();
});
