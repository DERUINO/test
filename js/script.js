$(document).ready(function () {
    cursor();
});

function cursor () {
  $(window).mousemove(function (pos) { 
    $(".point,.curcle").css({
      'left': (pos.pageX)+'px',
      'top': (pos.pageY)+'px'
    }); 
  });

  $('.link').hover(function () {
    $('.curcle,.point').toggleClass('hover');
  });
}