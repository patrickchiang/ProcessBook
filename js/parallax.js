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
	
	window.scroll(0, 2025);
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
		var transparencyMax = slide.data("transparency") ? parseFloat(slide.data("transparency")) : 0.5;
		var fadeMaxStart = parseInt(slide.data("fade-out-start")) ? parseInt(slide.data("fade-out-start")) : 0;
		var fadeMaxEnd = parseInt(slide.data("fade-out-end")) ? parseInt(slide.data("fade-out-end")) : 0;
		var fadeMinStart = parseInt(slide.data("fade-in-start")) ? parseInt(slide.data("fade-in-start")) : 0;
		var fadeMinEnd = parseInt(slide.data("fade-in-end")) ? parseInt(slide.data("fade-in-end")) : 0;

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
