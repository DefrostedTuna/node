$(function() {
  var LodestoneCharacterName = ($('#h-character-name').val() ? $('#h-character-name').val() : "Shinichi Sagara");
  var LodestoneCharacterServer = ($('#h-character-server').val() ? $('#h-character-server').val() : "Adamantoise" );

  LodestoneAPI.Search.Character(LodestoneCharacterName, LodestoneCharacterServer, function(Character) {
    if(Character) {
      console.log(Character);
      // Character name, job level and class
      $('.character-name').append(Character.name);
      $('.character-joblv').append("<p>Lv " + Character.activeLevel + " " + Character.activeJob + "</p>");
      // Character portrait
      $('.character-portrait').append("<img src=" + Character.portrait + "/>");
      // FC Info
      $('.character-gcinfo').prepend('<h4>' + Character.freeCompany + '</h4>');
      $.each(Character.grandCompany, function (array, grandCompany) {
        $('.character-gcinfo').append(
          "<p><span><img src='" + grandCompany.icon + "'/></span>" +
          '<span> ' + grandCompany.rank + '</span></p>');
        console.log(grandCompany.company + grandCompany.rank);
      });
      // Classes section
      $('.character-class-wrap').prepend("<h4>Classes</h4>");
      $.each(Character.classjobs, function (array, job) {
        $(".character-classes").append("<div class='character-class'>" +
          "<p><span>" +
          job.level +
          "</span>" +
          job.name +
          "</p>");
      });
      // Minions section
      $('.character-minion-wrap').prepend("<h4>Minions</h4>");
      $.each(Character.minions, function (array, minion) {
        $(".character-minions").append("<img src='" + minion.icon + "' alt='" + minion.name + "'/>");
      });
      //Mounts section
      $('.character-mount-wrap').prepend("<h4>Mounts</h4>");
      $.each(Character.mounts, function (array, mount) {
        $(".character-mounts").append("<img src='" + mount.icon + "' alt='" + mount.name + "'/>");
      });
      // Load the content only after the div is ready to be loaded
      $('.character-portrait img').one('load', function() {
        $('.lodestone-wrapper').addClass("animated bounceInRight show");
      });
    } else {
      console.log("Couldn't find it bro!");
    }
  });
  // End Lodestone Stuff
  //======================

  //=============
  // RSS Stuff
  $.getJSON("https://www.reddit.com/r/ffxiv/new/.json", function(data) {
    // Iterate through each post object
    $.each(data.data.children.slice(0, 20), function(index, post) {

      // Gather variables for injection
      // Article Title
      // Article Date
      // Article Body
      // Article Media

      var articleTitle = post.data.title;
      var articleDate = $.timeago(new Date(post.data.created_utc * 1000));
      var articleBody = $('<div/>').html(post.data.selftext_html).text();

      // Link Types
      // Check to see if the post contains media of any kind
      if(post.data.post_hint == "image") {
        // Grab the direct URL for better image viewing
        var articleMedia =  $('<div class="article-media" />').append(
                            '<a href="' + post.data.url + '" target="_blank">' +
                            '<img src="' + post.data.url + '" />' +
                            '</a>');
      } else if(post.data.post_hint == "rich:video") {
        // Grab and parse the raw iframe like we did with the body text
        var articleMedia =  $('<div class="article-media" />').append($('<div/>').html(post.data.secure_media.oembed.html).text());
      } else if(post.data.post_hint == "link") {
        // Grab the screenshot for the link
        var articleMedia =  $('<div class="article-media" />').append(
                            '<a href="' + post.data.url + '" target="_blank">' +
                            '<img src="' + post.data.preview.images[0].source.url + '" />' +
                            '</a>');
      } else {
        // Else append nothing
        var articleMedia = '';
      }

      //=================
      // DOM Construction... So ugly... /cry
      $('<div class="rss-article" />')
      .append($('<div class="article-title" />')
        .append( $('<h4 class="article-heading">').append(articleTitle) )
        .append( $('<small>').append(articleDate) )
      )
      .append($('<div class="article-body" />')
        .append(articleBody)
        .append(articleMedia)
      )
      .append($('<div class="article-footer" />')
        .append('Submitted by: ' +
                '<a href="https://www.reddit.com/user/' + post.data.author + '" target="_blank">' +
                  post.data.author +
                '</a> | ')
        .append('<a href="https://www.reddit.com' + post.data.permalink + '" target="_blank">' + "Link to post" + '</a> | ')
        .append('<a href="' + post.data.url + '" target="_blank">' + 'External link' + '</a>')
      )
      .append('<hr>')
      .appendTo('.rss-articles-wrap');

    });
    // Cleanup empty articles to prevent an empty slide down
    $(".article-body:empty").remove();
    // DOM Construction
    //==================

    $(".article-title").click(function() {
      $(this).next('.article-body').slideToggle();
    });
  });
  // End RSS Stuff
  //===============

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
