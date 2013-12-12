var viewHeight = $(window).height();
var viewWidth = $(window).width();

$(function() {

	$(".slide").height(viewHeight).width(viewWidth);
	init();

	$("li").tooltip({
		placement : "bottom"
	});

	$.stellar();

	$('a[rel=popover]').popover({
		html : true,
		trigger : 'hover',
		placement : 'right',
		content : function() {
			return '<img src="' + $(this).data('img') + '" class="popover-img" alt="img" />';
		}
	});

	$('img[rel=popover]').popover({
		html : true,
		trigger : 'hover',
		placement : 'right',
		content : function() {
			return '<img src="' + $(this).attr('src') + '" class="img-img" alt="img" />';
		}
	});

	$(".table a").click(function() {
		scrollToAnchor($(this).attr("href").split("#")[1]);
	});
});

function scrollToAnchor(anchor) {
	var aTag = $("div[id='" + anchor + "']");
	$('html,body').animate({
		scrollTop : aTag.offset().top
	}, 'slow');
}

function init() {
	var slides = $(".slide");
	for (var i = 0; i < slides.length; i++) {
		var offset = $(slides[i]).data("offset") ? parseFloat($(slides[i]).data("offset")) : 0;

		$(slides[i]).offset({
			top : (i + offset) * viewHeight
		});
	}

	var objects = $(".object");
	for (var i = 0; i < objects.length; i++) {
		var object = $(objects[i]);
		var slideNum = parseInt(object.data("slide-num"));
		var slidePercent = parseInt(object.data("slide-percent"));
		object.offset({
			top : (slideNum - 1 + (slidePercent / 100)) * viewHeight
		});
	}
}
