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

$(function() {
    $(".iframe-wrap").fitVids();
    $("[class^=flash-hide]").click(function() {
        $(this).fadeOut();
    });

    LodestoneAPI.Search.Character("Shinichi Sagara", "Adamantoise", function(Character) {

        $('.lodestone-wrapper').append(Character);

    };

});
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