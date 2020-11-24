 $(document).ready(function () {

    let viewport = $("#viewport").width(); // Ширина видимой части
    let slider = $("div.slider"); // Весь слайдер
    let viewSliders = $(".viewSlide"); // Показатели какой сейчас слайд показывается
    let viewSlide = 0; // Номер слайда
     
    viewSliders[viewSlide].style.backgroundColor = "green";

    $(".next").click(function () {
        NextSlide();
    });

    var AutoSlide = setInterval(NextSlide, 5000);

    $('#viewport, .prev, .next').hover(function () {
        clearInterval(AutoSlide);
    }, function () {
        AutoSlide = setInterval(NextSlide, 5000);
    });

    function NextSlide () {
            // Делаем индикатор слайда который сейчас отображается красным
            viewSliders[viewSlide].style.backgroundColor = "red";
            // Проверяем, если номер слайда который сейчас показывается меньше 4
            if (viewSlide < 2) {
                // То номер слайда увеличивается на 1
                viewSlide++;
            } else {
                // Иначе он будет равен 0
                viewSlide = 0;
            }
            // Делаем индикатор слайда зелёным
            viewSliders[viewSlide].style.backgroundColor = "green";
            // Задаём слайду значение позиции left через анимацию
            slider.animate({'left': -viewSlide * viewport + "px"}, {'duration': 1000})  
    }

    // Обработка события клик
    $(".prev").click(function () { 
        viewSliders[viewSlide].style.backgroundColor = "red";
        // Проверяем что номер слада больше нуля
        if (viewSlide > 0) {
            viewSlide--;
        } else {
            // Иначе присваиваем четыре
            viewSlide = 2;
        }
        // Делаем индикатор зелёным 
        viewSliders[viewSlide].style.backgroundColor = "green";
        // Меняем позицию left с анимацией
        slider.animate({'left': -viewSlide * viewport + "px"}, {'duration': 1000})  
    });

});