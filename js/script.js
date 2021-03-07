$(document).ready(function () {
    cursor();
});

function cursor () {
  $(window).mousemove(function (pos) { 
    $(".point").css({
      'left': (pos.pageX)+'px',
      'top': (pos.pageY)+'px',
      'opacity': '1'
    }); 
  });

  $(window).mousemove(function (pos) { 
    $(".cursor").css({
      'left': (pos.pageX)+'px',
      'top': (pos.pageY)+'px',
      'transition': '0.1s',
      'opacity': '1'
    });
  });

  $('.link').hover(function () {
    $('.cursor,.point').toggleClass('hover');
  });
}