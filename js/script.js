 $(document).ready(function () {
    for (i = 0; i < 3; i++) {
        $(".list li").clone().appendTo(".list");
    }
    $('.button').click(function () {
        $('.window').css({
            right: "0"
        });
        function selfRandom(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        var x = selfRandom(50, 100);
      
        $('.window').animate({
            right: x*96
        }, 10000, function() {
            alert('Число ' + x);
        });
      
        $('.count').html(x);
    });
});