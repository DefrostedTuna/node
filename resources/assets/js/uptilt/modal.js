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
