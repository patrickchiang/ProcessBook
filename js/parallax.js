var viewHeight = $(window).height();
var viewWidth = $(window).width();
var currentScroll = 0;
var scrollSpeeds = [0, 0.2, 0.2, 0.2];

$(function() {
    $(".slide").height(viewHeight).width(viewWidth);
    initSlides();

    $(window).scroll(moveUp);
});

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
        var slide = $(slides[i]);

        var speed = scrollSpeeds[i];

/*
        for (var j = 0; j <= i; j++) {
            speed += scrollSpeeds[j];
        }
*/
        var amt = slide.position().top - ($(window).scrollTop() - currentScroll) * speed;
        console.log(amt);

        slide.offset({
            top : amt
        });
    }

    currentScroll = $(window).scrollTop();
}
