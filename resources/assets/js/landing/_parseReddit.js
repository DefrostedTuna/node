$(function() {
  //=============
  // RSS Stuff

  var subreddit       = ($('#h-subreddit').val() ? $('#h-subreddit').val() : "ffxiv");
  var subredditTitle  = "Recent posts from /r/" + subreddit;
  if(subreddit == "ffxiv") {
    var subredditTitle = "Final Fantasy X|V: Heavensward";
  } else if(subreddit == "wow") {
    var subredditTitle = "World of Warcraft";
  }
  $('.subreddit-title').append(subredditTitle);

  $.getJSON("https://www.reddit.com/r/" + subreddit  + "/new/.json", function(data) {
    // Iterate through each post object
    $.each(data.data.children.slice(0, 10), function(index, post) {

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
        var articleMedia =  $('<div class="article-media" />').append($('<div/>').html(post.data.media.oembed.html).text());
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
      $('<div ' + 'id="rss-a-' + index + '" ' + 'class="rss-article" />')
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
      .appendTo('.rss-articles-wrap');

    });
    // Cleanup empty articles to prevent an empty slide down
    // This prevents an empty element from being loaded into the page
    $(".article-body:empty").remove();

    // Show RSS container after all content is loaded
    $('.rss-container').fadeIn(1000);

    // Slide up and fade in the posts for a stacking like effect
    for (var i = 0; i < 10; i++) {
      $('#rss-a-' + i).queue(function(n) {
        console.log("in queue" + i);
        $(this).css({
          "opacity" : "1",
          "margin-top" : "0.5em",
        });
      });
    }

    //test
    // var rssCardStart = 0, rssCardEnd = 10;
    // (function rssCardStack () {
    //     if (rssCardStart < rssCardEnd) {
    //       console.log("#rss-a-" + rssCardStart);
    //       $('#rss-a-' + rssCardStart++).animate({
    //         "opacity" : "1",
    //         "margin-top" : "0.5em",
    //         "queue" : "false"
    //       }, 300, rssCardStack);
    //     }
    // }) ();
    //test

    // DOM Construction
    //==================

    $(".article-title").click(function() {
      $(this).next('.article-body').slideToggle();
    });
  });
  // End RSS Stuff
  //===============
});
