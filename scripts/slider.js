let currentSlide = 0;

        function showSlide(index) {
            const slides = document.querySelector('.slides');
            const totalSlides = document.querySelectorAll('.slide').length;

            // Обработка циклического слайдера
            if (index >= totalSlides) {
                currentSlide = 0;
            } else if (index < 0) {
                currentSlide = totalSlides - 1;
            } else {
                currentSlide = index;
            }

            const offset = -currentSlide * 100; // смещение в процентах
            slides.style.transform = `translateX(${offset}%)`; // перемещение слайдов
        }

        function changeSlide(direction) {
            showSlide(currentSlide + direction);
        }

        // Автоматическая смена слайдов каждые 5 секунд
        setInterval(() => {
            changeSlide(1);
        }, 5000);