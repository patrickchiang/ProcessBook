var viewHeight = $(window).height();
var viewWidth = $(window).width();

$(function() {
	
	$(".slide").height(viewHeight).width(viewWidth);
	init();

	$(window).scroll(moveUp);
	$(".navbar a").click(gotoSection);

	$.stellar();
});

function gotoSection(e) {
	e.preventDefault();

	var slide = $($(this).attr("href"));

	var move = slide.position().top - $(window).scrollTop();
	var lastMove = move;
	for (var i = 0; i < 100; i++) {
		lastMove = parseFloat(slide.data("speed")) * lastMove;
		move -= lastMove;
	}
	console.log(move);
	window.scroll(0, move);
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

	var parallax = $(".parallax");
	for (var i = 0; i < parallax.length; i++) {
		var par = $(parallax[i]);
		par.css({
			opacity : par.data("transparency") ? parseFloat(par.data("transparency")) : 0.5
		});
	}
}

function moveUp() {
	var slides = $(".parallax");

	for (var i = 0; i < slides.length; i++) {
		// Variable
		var slide = $(slides[i]);
		var speed = parseFloat(slide.data("speed"));
		var transparencyMax = slide.data("transparency") ? parseFloat(slide.data("transparency")) : 0.5;
		var fadeMaxStart = parseInt(slide.data("fade-out-start"));
		var fadeMaxEnd = parseInt(slide.data("fade-out-end"));
		var fadeMinStart = parseInt(slide.data("fade-in-start"));
		var fadeMinEnd = parseInt(slide.data("fade-in-end"));

		// Fading out
		var slideBottom = slide.position().top + viewHeight;
		var fadeSpeedMax = (transparencyMax / Math.max(-(fadeMaxStart - fadeMaxEnd), 0.1));
		var opacityIn = transparencyMax - ($(window).scrollTop() - (slideBottom + fadeMaxStart)) * fadeSpeedMax;
		opacityIn = Math.min(opacityIn, transparencyMax);

		// Fading in
		var slideTop = slide.position().top;
		var fadeSpeedMin = (transparencyMax / Math.max((fadeMinEnd - fadeMinStart), 0.1));
		var opacityOut = ($(window).scrollTop() - (slideTop + fadeMinStart) + viewHeight) * fadeSpeedMin;
		opacityOut = Math.min(opacityOut, transparencyMax);

		var opacity = Math.min(opacityIn, opacityOut);

		slide.css("opacity", opacity);
	}
}
