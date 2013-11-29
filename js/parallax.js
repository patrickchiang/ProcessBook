var viewHeight = $(window).height();
var viewWidth = $(window).width();
var currentScroll = 0;
var scrollSpeeds = [0, 0.2, 0.2, 0.2];
var fadeMaxStart = [-300, -500, 0, 0];
var fadeMaxEnd = [-150, 0, 0, 0];
var transparencyMax = [1, 0.5, 0.5, 0.5];

$(function() {
    $(".slide").height(viewHeight).width(viewWidth);
    initSlides();

    $(window).scroll(moveUp);
    $(".navbar a").click(gotoSection);
});

function gotoSection() {
    $(window).scroll();
}

function initSlides() {
    var slides = $(".slide");
    for (var i = 0; i < slides.length; i++) {
        $(slides[i]).offset({
            top : i * viewHeight
        });
    }
}

function moveUp() {
    var slides = $(".slide");
    for (var i = 0; i < slides.length; i++) {
        // Scrolling
        var slide = $(slides[i]);
        var speed = scrollSpeeds[i];
        var amt = slide.position().top - ($(window).scrollTop() - currentScroll) * speed;
        //console.log(amt);

        slide.offset({
            top : amt
        });

        // Fading
        var opacity = slide.css("opacity");
        var slideBottom = slide.position().top + viewHeight;
        var fadeSpeed = (transparencyMax[i] / Math.max(-(fadeMaxStart[i] - fadeMaxEnd[i]), 0.1));
        opacity = transparencyMax[i] - ($(window).scrollTop() - (slideBottom + fadeMaxStart[i])) * fadeSpeed;
        slide.css("opacity", Math.min(opacity, transparencyMax[i]));
    }

    currentScroll = $(window).scrollTop();
}
