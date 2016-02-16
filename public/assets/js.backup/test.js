$(function() {
var xml = $.getJSON("https://www.reddit.com/r/ffxiv/new/.json").done(function() {
  var posts = JSON.parse(xml.responseText).data.children;
  console.log(posts);
  console.log(posts[0].data);
  $.each(posts, function(index, post) {
    var articleTitle = post.data.title;
    var articleDate = $.timeago(new Date(post.data.created_utc * 1000));
    var articleBody = $('<div/>').html(post.data.selftext_html).text();
    var articleImage =  post.data.thumbnail;
    if(post.data.post_hint == "image") {
      var articleImage =  $('<div class="article-image" />').append(
                          '<a href="' + post.data.url + '" target="_blank">' +
                          '<img src="' + post.data.url + '" />' +
                          '</a>');
    } else {
      var articleImage = '';
    }

    $('<div class="rss-article" />')
    .append($('<div class="article-title" />')
      .append( $('<h4 class="article-heading">').append(articleTitle) )
      .append( $('<small>').append(articleDate) )
    )
    .append($('<div class="article-body" />')
      .append(articleBody)
      .append(articleImage)
    )
    .append($('<div class="article-footer" />')
      .append('Submitted by: ' +
              '<a href="https://www.reddit.com/user/' + post.data.author + '" target="_blank">' +
                post.data.author +
              '</a>')
    )
    .append('<hr>')
    .appendTo('.rss-articles-wrap');

  });

  $(".article-title").click(function() {
    $(this).next('.article-body').slideToggle('slow');
  });
});

});
