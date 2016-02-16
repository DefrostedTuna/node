$(function() {
  //====================
  // On load animations
  $('.rss-container').addClass("animated bounceInUp show");
  $('.padding-wrapper iframe').addClass("animated bounceInDown show");
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
