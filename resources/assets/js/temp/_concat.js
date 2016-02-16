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

//========
// Modal
$(function() {
	//====================================
	// For modal - Good to go? I feel like I should refine this some more...

	var utAnimationEnd		= "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
	var modalIn						= "animated bounceInDown";
	var modalOut					= "animated zoomOut fadeOut";

	$(".ut-modal-trigger").click(function() {
		var target = "#" + $(this).data("ut-modal-target");
		$(target).addClass("ut-modal-show animated fadeIn");
		$("body").addClass("ut-modal-no-scroll");
		$(target).children(".ut-modal-outer").addClass(modalIn)
			.one(utAnimationEnd, function() {
				$(target).children(".ut-modal-outer").removeClass(modalIn);
				$(target).removeClass("animated fadeIn");
			});
		$(".root-body").addClass("ut-modal-blur");
	});

	$(".ut-modal-close").click(function() {
		var target = "#" + $(this).data("ut-modal-target");
		$(target).addClass("animated fadeOut");
		$(target).children(".ut-modal-outer").addClass(modalOut)
			.one(utAnimationEnd, function() {
				$(target).children(".ut-modal-outer").removeClass(modalOut);
				$(target).removeClass("ut-modal-show animated fadeOut");
			});
		$("body").removeClass("ut-modal-no-scroll");
		$(".root-body").removeClass("ut-modal-blur");
	});
});
// End modal
//============

/*jshint browser:true */
/*!
* FitVids 1.1
*
* Copyright 2013, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
*/
;(function( $ ){

  'use strict';

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null,
      ignore: null
    };

    if(!document.getElementById('fit-vids-style')) {
      // appendStyles: https://github.com/toddmotto/fluidvids/blob/master/dist/fluidvids.js
      var head = document.head || document.getElementsByTagName('head')[0];
      var css = '.fluid-width-video-wrapper{width:100%;position:relative;padding:0;}.fluid-width-video-wrapper iframe,.fluid-width-video-wrapper object,.fluid-width-video-wrapper embed {position:absolute;top:0;left:0;width:100%;height:100%;}';
      var div = document.createElement("div");
      div.innerHTML = '<p>x</p><style id="fit-vids-style">' + css + '</style>';
      head.appendChild(div.childNodes[1]);
    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        'iframe[src*="player.vimeo.com"]',
        'iframe[src*="youtube.com"]',
        'iframe[src*="youtube-nocookie.com"]',
        'iframe[src*="kickstarter.com"][src*="video.html"]',
        'object',
        'embed'
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var ignoreList = '.fitvidsignore';

      if(settings.ignore) {
        ignoreList = ignoreList + ', ' + settings.ignore;
      }

      var $allVideos = $(this).find(selectors.join(','));
      $allVideos = $allVideos.not('object object'); // SwfObj conflict patch
      $allVideos = $allVideos.not(ignoreList); // Disable FitVids on this video.

      $allVideos.each(function(count){
        var $this = $(this);
        if($this.parents(ignoreList).length > 0) {
          return; // Disable FitVids on this video.
        }
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        if ((!$this.css('height') && !$this.css('width')) && (isNaN($this.attr('height')) || isNaN($this.attr('width'))))
        {
          $this.attr('height', 9);
          $this.attr('width', 16);
        }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + count;
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+'%');
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
// Works with either jQuery or Zepto
})( window.jQuery || window.Zepto );

/*  --------------------------------------------------
 *  XIVPads.com (v5) - Lodestone API (Javascript)
 *  This runs off: XIVSync.com
 *
 *  > requires jquery.
 *  --------------------------------------------------
 *  API calls will match those of the PHP API, so for
 *  example, you can do:
 *
 *  LodestoneAPI.Search.Character(Name, Server);
 *  LodestoneAPI.Search.Character(123456);
 */
var LodestoneAPI =
{
    logEnabled: false,

    paths:
    {
        sync: 'http://xivsync.com',
        search: '/search/character',
        character: '/character/get',
    },

    // Initialize
    init: function()
    {
        LodestoneAPI.log('init()');

        // check for jquery.
        if (typeof window.jQuery == 'undefined') {
            console.error('Please include https://jquery.com/, this API requires it.');
        }
    },

    // wrapper for ajaxing
    get: function(url, data, callback)
    {
        LodestoneAPI.log('get', url);
        LodestoneAPI.log('get', data);

        $.ajax({
            url: url,
            data: data,
            crossDomain: true,
            dataType: 'json',
            success: function(data)
            {
                LodestoneAPI.log('get > return', data);
                if (data.ok) {
                    return callback(data.data);
                }

                console.error('XIVSync API Error: '+ data.msg);
                return callback(false);
            },
            error: function(data, status, error)
            {
                console.error('Error attempting to ajax to: ' + url);
                console.error(status);
                console.error(error);
                console.error('Please open an issue on Github: https://github.com/viion/XIVPads-LodestoneAPI');
                return callback(false);
            },
        })
    },

    // Logging
    log: function(text, data)
    {
        if (LodestoneAPI.logEnabled) {
            if (data) {
                console.log('[LODESTONE-API]', text, data);
                return;
            }

            console.log('[LODESTONE-API]', text);
        }
    },

    // Search for thingz
    Search:
    {
        Character: function(nameOrId, server, callback, recurrsive)
        {
            if (!callback || typeof callback !== 'function') {
                console.error('Callback function not defined.');
                return;
            }

            if (!nameOrId) {
                console.error('Name or ID is empty');
                return callback(false);
            }

            // if numeric, can just get character
            // else we have to search!
            if ($.isNumeric(nameOrId))
            {
                LodestoneAPI.log('search > character > isNumeric = true =', nameOrId);

                var url = LodestoneAPI.paths.sync + LodestoneAPI.paths.character,
                    data = { lodestone: nameOrId }

                LodestoneAPI.get(url, data, function(data)
                {
                    // if empty
                    if (data.length == 0) {
                        return callback(false);
                    }

                    return callback(data);
                });
            }
            else if (!recurrsive)
            {
                LodestoneAPI.log('search > character > isNumeric = false =', nameOrId);

                var url = LodestoneAPI.paths.sync + LodestoneAPI.paths.search,
                    data = { name: nameOrId, server: server }

                // get
                LodestoneAPI.get(url, data, function(data)
                {
                    // if empty
                    if (data.length == 0) {
                        return callback(false);
                    }


                    // Try match server and name
                    for (var i in data)
                    {
                        var c = data[i];
                        if (c.name == nameOrId && c.world == server && $.isNumeric(c.i));
                        {
                            // recurrsive callback on character using id
                            LodestoneAPI.log('search > character > recurrsion with id:', c.id);
                            LodestoneAPI.Search.Character(c.id, null, callback, true);
                            return;
                        }
                    }

                    LodestoneAPI.log('search > character > no results for: ', nameOrId);
                    return callback(false);
                });
            }
        },
    },
}
LodestoneAPI.init();
/**
 * Timeago is a jQuery plugin that makes it easy to support automatically
 * updating fuzzy timestamps (e.g. "4 minutes ago" or "about 1 day ago").
 *
 * @name timeago
 * @version 1.5.2
 * @requires jQuery v1.2.3+
 * @author Ryan McGeary
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://timeago.yarp.com/
 *
 * Copyright (c) 2008-2015, Ryan McGeary (ryan -[at]- mcgeary [*dot*] org)
 */

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && typeof module.exports === 'object') {
    factory(require('jquery'));
  } else {
    // Browser globals
    factory(jQuery);
  }
}(function ($) {
  $.timeago = function(timestamp) {
    if (timestamp instanceof Date) {
      return inWords(timestamp);
    } else if (typeof timestamp === "string") {
      return inWords($.timeago.parse(timestamp));
    } else if (typeof timestamp === "number") {
      return inWords(new Date(timestamp));
    } else {
      return inWords($.timeago.datetime(timestamp));
    }
  };
  var $t = $.timeago;

  $.extend($.timeago, {
    settings: {
      refreshMillis: 60000,
      allowPast: true,
      allowFuture: false,
      localeTitle: false,
      cutoff: 0,
      autoDispose: true,
      strings: {
        prefixAgo: null,
        prefixFromNow: null,
        suffixAgo: "ago",
        suffixFromNow: "from now",
        inPast: 'any moment now',
        seconds: "less than a minute",
        minute: "about a minute",
        minutes: "%d minutes",
        hour: "about an hour",
        hours: "about %d hours",
        day: "a day",
        days: "%d days",
        month: "about a month",
        months: "%d months",
        year: "about a year",
        years: "%d years",
        wordSeparator: " ",
        numbers: []
      }
    },

    inWords: function(distanceMillis) {
      if (!this.settings.allowPast && ! this.settings.allowFuture) {
          throw 'timeago allowPast and allowFuture settings can not both be set to false.';
      }

      var $l = this.settings.strings;
      var prefix = $l.prefixAgo;
      var suffix = $l.suffixAgo;
      if (this.settings.allowFuture) {
        if (distanceMillis < 0) {
          prefix = $l.prefixFromNow;
          suffix = $l.suffixFromNow;
        }
      }

      if (!this.settings.allowPast && distanceMillis >= 0) {
        return this.settings.strings.inPast;
      }

      var seconds = Math.abs(distanceMillis) / 1000;
      var minutes = seconds / 60;
      var hours = minutes / 60;
      var days = hours / 24;
      var years = days / 365;

      function substitute(stringOrFunction, number) {
        var string = $.isFunction(stringOrFunction) ? stringOrFunction(number, distanceMillis) : stringOrFunction;
        var value = ($l.numbers && $l.numbers[number]) || number;
        return string.replace(/%d/i, value);
      }

      var words = seconds < 45 && substitute($l.seconds, Math.round(seconds)) ||
        seconds < 90 && substitute($l.minute, 1) ||
        minutes < 45 && substitute($l.minutes, Math.round(minutes)) ||
        minutes < 90 && substitute($l.hour, 1) ||
        hours < 24 && substitute($l.hours, Math.round(hours)) ||
        hours < 42 && substitute($l.day, 1) ||
        days < 30 && substitute($l.days, Math.round(days)) ||
        days < 45 && substitute($l.month, 1) ||
        days < 365 && substitute($l.months, Math.round(days / 30)) ||
        years < 1.5 && substitute($l.year, 1) ||
        substitute($l.years, Math.round(years));

      var separator = $l.wordSeparator || "";
      if ($l.wordSeparator === undefined) { separator = " "; }
      return $.trim([prefix, words, suffix].join(separator));
    },

    parse: function(iso8601) {
      var s = $.trim(iso8601);
      s = s.replace(/\.\d+/,""); // remove milliseconds
      s = s.replace(/-/,"/").replace(/-/,"/");
      s = s.replace(/T/," ").replace(/Z/," UTC");
      s = s.replace(/([\+\-]\d\d)\:?(\d\d)/," $1$2"); // -04:00 -> -0400
      s = s.replace(/([\+\-]\d\d)$/," $100"); // +09 -> +0900
      return new Date(s);
    },
    datetime: function(elem) {
      var iso8601 = $t.isTime(elem) ? $(elem).attr("datetime") : $(elem).attr("title");
      return $t.parse(iso8601);
    },
    isTime: function(elem) {
      // jQuery's `is()` doesn't play well with HTML5 in IE
      return $(elem).get(0).tagName.toLowerCase() === "time"; // $(elem).is("time");
    }
  });

  // functions that can be called via $(el).timeago('action')
  // init is default when no action is given
  // functions are called with context of a single element
  var functions = {
    init: function() {
      var refresh_el = $.proxy(refresh, this);
      refresh_el();
      var $s = $t.settings;
      if ($s.refreshMillis > 0) {
        this._timeagoInterval = setInterval(refresh_el, $s.refreshMillis);
      }
    },
    update: function(timestamp) {
      var date = (timestamp instanceof Date) ? timestamp : $t.parse(timestamp);
      $(this).data('timeago', { datetime: date });
      if ($t.settings.localeTitle) $(this).attr("title", date.toLocaleString());
      refresh.apply(this);
    },
    updateFromDOM: function() {
      $(this).data('timeago', { datetime: $t.parse( $t.isTime(this) ? $(this).attr("datetime") : $(this).attr("title") ) });
      refresh.apply(this);
    },
    dispose: function () {
      if (this._timeagoInterval) {
        window.clearInterval(this._timeagoInterval);
        this._timeagoInterval = null;
      }
    }
  };

  $.fn.timeago = function(action, options) {
    var fn = action ? functions[action] : functions.init;
    if (!fn) {
      throw new Error("Unknown function name '"+ action +"' for timeago");
    }
    // each over objects here and call the requested function
    this.each(function() {
      fn.call(this, options);
    });
    return this;
  };

  function refresh() {
    var $s = $t.settings;

    //check if it's still visible
    if ($s.autoDispose && !$.contains(document.documentElement,this)) {
      //stop if it has been removed
      $(this).timeago("dispose");
      return this;
    }

    var data = prepareData(this);

    if (!isNaN(data.datetime)) {
      if ( $s.cutoff == 0 || Math.abs(distance(data.datetime)) < $s.cutoff) {
        $(this).text(inWords(data.datetime));
      }
    }
    return this;
  }

  function prepareData(element) {
    element = $(element);
    if (!element.data("timeago")) {
      element.data("timeago", { datetime: $t.datetime(element) });
      var text = $.trim(element.text());
      if ($t.settings.localeTitle) {
        element.attr("title", element.data('timeago').datetime.toLocaleString());
      } else if (text.length > 0 && !($t.isTime(element) && element.attr("title"))) {
        element.attr("title", text);
      }
    }
    return element.data("timeago");
  }

  function inWords(date) {
    return $t.inWords(distance(date));
  }

  function distance(date) {
    return (new Date().getTime() - date.getTime());
  }

  // fix for IE6 suckage
  document.createElement("abbr");
  document.createElement("time");
}));

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
});

$(function() {
  //=============
  // RSS Stuff
  $.getJSON("https://www.reddit.com/r/ffxiv/new/.json", function(data) {
    // Iterate through each post object
    $.each(data.data.children.slice(0, 10), function(index, post) {
      console.log(post);

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
});

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
