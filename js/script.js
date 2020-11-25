 $(document).ready(function () {

    let viewport = $("#viewport").width();
    let slider = $("div.slider");
    let viewSliders = $(".viewSlide");
    let countSlide = $('.slide').length;

    let viewSlide = 0;
    let SlideTime = 5000;

    $('.slider').css('width', 'calc(100% * '+countSlide+')');

    $(".next").click(function () {
        NextSlide();
    });

    $(".prev").click(function () {
        PrevSlide();
    });

    let AutoSlide = setInterval(NextSlide, SlideTime);

    $('#viewport').hover(function () {
        clearInterval(AutoSlide);
    }, function () {
        AutoSlide = setInterval(NextSlide, SlideTime);
    });

    $('.prev, .next').click(function () {
       clearInterval(AutoSlide); 
    })

    function NextSlide () {

            if (viewSlide < (countSlide-1)) {
                viewSlide++;
            } else {
                viewSlide = 0;
            }

            slider.queue(function (SlideHide) {
                slider.fadeOut(700);
                SlideHide();
            });
            slider.queue(function (SlideLeft) {
                slider.css({
                    left: -viewSlide * viewport + "px"
                });
                SlideLeft();
            });
            slider.queue(function (SlideShow) {
                slider.fadeIn(700);
                SlideShow();
            });
    }

    function PrevSlide () {
            if (viewSlide > 0) {
                viewSlide--;
            } else {
                viewSlide = countSlide-1;
            }
            
            slider.queue(function (SlideHide) {
                slider.fadeOut(700);
                SlideHide();
            });
            slider.queue(function (SlideLeft) {
                slider.css({
                    left: -viewSlide * viewport + "px"
                });
                SlideLeft();
            });
            slider.queue(function (SlideShow) {
                slider.fadeIn(700);
                SlideShow();
            });
    }

});